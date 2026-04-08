import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterCompanyDto } from '../company/dto/register-company.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔹 Login user
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  // 🔹 Register company + admin user
  @Post('register')
  async register(@Body() body: RegisterCompanyDto) {
    return this.authService.registerCompany(body);
  }
}
