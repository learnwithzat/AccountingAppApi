import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { TenantContextService } from '../tenants/tenant-context.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private tenantContext: TenantContextService,
  ) {}

  async findAll(): Promise<User[]> {
    const tenantId = this.tenantContext.tenantId;
    if (!tenantId) throw new ForbiddenException('Tenant context missing');

    return this.usersRepository.find({
      where: { tenantId },
    });
  }

  async createWithTenant(
    userData: Partial<User>,
    tenantId: string,
  ): Promise<User> {
    const user = this.usersRepository.create({ ...userData, tenantId });
    return this.usersRepository.save(user);
  }

  async create(userData: Partial<User>): Promise<User> {
    const tenantId = this.tenantContext.tenantId;
    if (!tenantId) throw new ForbiddenException('Tenant context missing');
    return this.createWithTenant(userData, tenantId);
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id } as any);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'tenantId', 'role'],
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'username', 'email', 'password', 'tenantId', 'role'],
    });
  }
}
