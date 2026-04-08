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

    // 10-day trial
    const now = new Date();
    const trialEnd = new Date();
    trialEnd.setDate(now.getDate() + 10);

    const company = this.companyRepo.create({
      companyName,
      email,
      phoneNumber,
      slug: this.generateSlug(companyName),
      plan: 'free',
      trialStart: now,
      trialEnd,
      isSubscribed: false, // manual payment status
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

  /** Check if trial is active */
  isTrialActive(company: Company) {
    return company.isTrialActive();
  }

  /** Activate manual subscription */
  async activateSubscription(companyId: string) {
    const company = await this.findById(companyId);
    company.isSubscribed = true; // ✅ use isSubscribed
    return this.save(company);
  }

  /** Deactivate subscription */
  async deactivateSubscription(companyId: string) {
    const company = await this.findById(companyId);
    company.isSubscribed = false; // ✅ use isSubscribed
    return this.save(company);
  }

  async findAll() {
    return this.companyRepo.find(); // Or however you fetch all companies
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
