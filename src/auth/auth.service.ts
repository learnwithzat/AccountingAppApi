import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CompanyService } from '../company/company.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterCompanyDto } from '../company/dto/register-company.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {}

  /** Login user */
  async login({ username, password }: LoginDto) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid username or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new UnauthorizedException('Invalid username or password');

    const company = user.company;

    // ❌ Block login if subscription expired and trial over
    if (
      company &&
      !company.isActiveSubscription &&
      !this.companyService.isTrialActive(company)
    ) {
      throw new UnauthorizedException(
        'Subscription expired. Please contact admin.',
      );
    }

    const payload = {
      sub: user.id,
      username: user.username,
      companyId: company?.id,
      companyName: company?.companyName,
      role: user.role || 'admin',
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  /** Register admin under existing company */
  async register(data: LoginDto, companyId: string) {
    const existing = await this.userService.findByUsername(data.username);
    if (existing) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const company = await this.companyService.findById(companyId);
    if (!company) throw new BadRequestException('Company not found');

    const user = await this.userService.create({
      username: data.username,
      password: hashedPassword,
      company,
    });

    const payload = {
      sub: user.id,
      username: user.username,
      companyId: company.id,
      companyName: company.companyName,
      role: user.role || 'staff',
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  /** Register company + admin user */
  async registerCompany(dto: RegisterCompanyDto) {
    const result = await this.companyService.registerCompany(dto);

    const company = await this.companyService.findById(result.companyId);

    const adminUser = await this.userService.findAdminByCompany(company.id);

    if (!adminUser) throw new BadRequestException('Admin user not found');

    const payload = {
      sub: adminUser.id,
      username: adminUser.username,
      companyId: adminUser.company?.id,
      companyName: adminUser.company?.companyName,
      role: adminUser.role,
    };

    return { access_token: this.jwtService.sign(payload), ...result };
  }

  /** Validate user for JWT Strategy */
  async validateUser(userId: string): Promise<any> {
    // Use the correct method to find user by ID
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }
}
