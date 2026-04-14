import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterCompanyDto } from '../company/dto/register-company.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  // 🔹 Get current user profile (Session Check)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }

  // 🔹 Logout
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return { message: 'Logged out successfully' };
  }
}
