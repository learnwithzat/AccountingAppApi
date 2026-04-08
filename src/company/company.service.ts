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
    private companyRepo: Repository<Company>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async registerCompany(dto: RegisterCompanyDto) {
    const { companyName, username, email, phoneNumber, password } = dto;

    // 🔹 Check existing username
    const existingUser = await this.userRepo.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    // 🔹 Check existing company email
    const existingCompany = await this.companyRepo.findOne({
      where: { email },
    });

    if (existingCompany) {
      throw new BadRequestException('Company email already exists');
    }

    // 🔹 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Create company
    const company = this.companyRepo.create({
      companyName,
      email,
      phoneNumber,
    });

    await this.companyRepo.save(company);

    // 🔹 Create admin user under company
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
}
