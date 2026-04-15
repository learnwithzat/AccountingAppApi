import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async login(username: string, pass: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      tenantId: user.tenantId,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterDto) {
    const existingByUsername = await this.usersService.findOneByUsername(
      dto.username,
    );
    const existingByEmail = await this.usersService.findOneByEmail(dto.email);

    if (existingByUsername || existingByEmail) {
      throw new ConflictException('Username or Email already registered');
    }

    // 1. Create Tenant
    const slug = dto.companyName.toLowerCase().replace(/ /g, '-');
    const tenant = await this.tenantRepository.save(
      this.tenantRepository.create({
        name: dto.companyName,
        slug,
        email: dto.email,
        phone: dto.phone,
        country: dto.country || 'USA',
        currency: dto.currency || 'USD',
        timezone: dto.timezone || 'UTC',
      }),
    );

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Create Admin User linked to Tenant
    const newUser = await this.usersService.createWithTenant(
      {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: 'admin',
      },
      tenant.id,
    );

    const payload = {
      sub: newUser.id,
      username: newUser.username,
      tenantId: tenant.id,
      role: newUser.role,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}
