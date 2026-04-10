import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { User } from '../user/user.entity';
import { RegisterCompanyDto } from './dto/register-company.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /* ───── FIND ───── */
  async findById(companyId: string): Promise<Company> {
    const company = await this.companyRepo.findOne({
      where: { id: companyId },
      relations: ['users'],
    });

    if (!company) throw new BadRequestException('Company not found');

    return company;
  }

  /* ───── REGISTER (ERP VERSION) ───── */
  async registerCompany(dto: RegisterCompanyDto) {
    const existingUser = await this.userRepo.findOne({
      where: { username: dto.username },
    });

    if (existingUser) throw new BadRequestException('Username already exists');

    const existingCompany = await this.companyRepo.findOne({
      where: { email: dto.email },
    });

    if (existingCompany)
      throw new BadRequestException('Company email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const now = new Date();
    const trialEnd = new Date();
    trialEnd.setDate(now.getDate() + 10);

    const company = this.companyRepo.create({
      companyName: dto.companyName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      slug: this.generateSlug(dto.companyName),

      plan: 'free',
      trialStart: now,
      trialEnd,
      isSubscribed: false,
      isActive: true,

      /* ERP DEFAULTS */
      country: dto.country || 'IN',
      taxSystem: dto.taxSystem || 'GST',
      defaultTaxRate: dto.defaultTaxRate || 18,
      currency: dto.currency || 'INR',
      invoicePrefix: dto.invoicePrefix || 'INV',
    });

    await this.companyRepo.save(company);

    const user = this.userRepo.create({
      username: dto.username,
      password: hashedPassword,
      role: 'admin',
      company,
    });

    await this.userRepo.save(user);

    return {
      message: 'Company registered successfully',
      companyId: company.id,
    };
  }

  /* ───── UPDATE PLAN ───── */
  async updatePlan(companyId: string, newPlan: string) {
    const company = await this.findById(companyId);

    company.plan = newPlan;

    if (newPlan === 'free') {
      company.isSubscribed = false;

      const now = new Date();
      company.trialStart = now;

      const trialEnd = new Date();
      trialEnd.setDate(now.getDate() + 10);
      company.trialEnd = trialEnd;
    } else {
      company.isSubscribed = true;
      company.trialStart = null;
      company.trialEnd = null;
    }

    return this.companyRepo.save(company);
  }

  /* ───── UPDATE SETTINGS ───── */
  async updateSettings(
    id: string,
    body: {
      country: string;
      taxSystem: string;
      defaultTaxRate: number;
      currency: string;
      invoicePrefix?: string;
    },
  ) {
    return this.companyRepo.update(id, {
      country: body.country,
      taxSystem: body.taxSystem,
      defaultTaxRate: body.defaultTaxRate,
      currency: body.currency,
      invoicePrefix: body.invoicePrefix,
    });
  }

  /* ───── FIND ALL ───── */
  async findAll() {
    return this.companyRepo.find();
  }

  /* ───── SLUG ───── */
  private generateSlug(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async activateSubscription(companyId: string) {
    const company = await this.findById(companyId);

    company.isSubscribed = true;
    company.isActive = true;

    // optional: remove trial limits
    company.trialStart = null;
    company.trialEnd = null;

    return this.companyRepo.save(company);
  }
  async deactivateSubscription(companyId: string) {
    const company = await this.findById(companyId);

    company.isSubscribed = false;
    company.isActive = false;

    return this.companyRepo.save(company);
  }
  isTrialActive(company: Company): boolean {
    if (!company.trialEnd) return false;
    return new Date(company.trialEnd).getTime() > Date.now();
  }
}
