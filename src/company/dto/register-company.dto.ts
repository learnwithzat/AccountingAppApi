// src/company/dto/register-company.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterCompanyDto {
  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @MinLength(6)
  password: string;
}
