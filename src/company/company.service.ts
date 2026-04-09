// src/company/company.service.ts
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

  /** Find company by ID */
  async findById(companyId: string): Promise<Company> {
    const company = await this.companyRepo.findOne({
      where: { id: companyId },
      relations: ['users'],
    });
    if (!company) throw new BadRequestException('Company not found');
    return company;
  }

  /** Save company */
  async save(company: Company): Promise<Company> {
    return this.companyRepo.save(company);
  }

  /** Register a new company + admin user */
  async registerCompany(dto: RegisterCompanyDto) {
    const { companyName, username, email, phoneNumber, password } = dto;

    const existingUser = await this.userRepo.findOne({ where: { username } });
    if (existingUser) throw new BadRequestException('Username already exists');

    const existingCompany = await this.companyRepo.findOne({
      where: { email },
    });
    if (existingCompany)
      throw new BadRequestException('Company email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const now = new Date();
    const trialEnd = new Date();
    trialEnd.setDate(now.getDate() + 10); // 10-day trial

    const company = this.companyRepo.create({
      companyName,
      email,
      phoneNumber,
      slug: this.generateSlug(companyName),
      plan: 'free',
      trialStart: now,
      trialEnd,
      isSubscribed: false,
      isActive: true,
    });
    await this.companyRepo.save(company);

    const user = this.userRepo.create({
      username,
      password: hashedPassword,
      role: 'admin',
      company,
    });
    await this.userRepo.save(user);

    return {
      message: 'Company registered successfully',
      companyId: company.id,
      username: user.username,
    };
  }

  /** Update company plan */
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
      company.trialStart = null; // OK if entity nullable
      company.trialEnd = null; // OK if entity nullable
    }

    return this.save(company);
  }

  /* Activate manual subscription */
  async activateSubscription(companyId: string) {
    const company = await this.findById(companyId);
    company.isSubscribed = true;
    return this.save(company);
  }

  /* Deactivate subscription */
  async deactivateSubscription(companyId: string) {
    const company = await this.findById(companyId);
    company.isSubscribed = false;
    return this.save(company);
  }

  async findAll() {
    return this.companyRepo.find();
  }
  /** Check if trial is active */
  isTrialActive(company: Company): boolean {
    if (!company.trialEnd) return false;
    return company.trialEnd.getTime() > new Date().getTime();
  }

  /** Generate slug */
  private generateSlug(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
