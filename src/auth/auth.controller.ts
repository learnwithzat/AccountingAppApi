import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/public.decorator';
import { RegisterDto } from './dto/register.dto';

class SignInDto {
  username!: string;
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() // Bypasses the global JwtAuthGuard
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

  @Public() // Also bypasses guards
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Registration creates its own tenant context internally
    return this.authService.register(registerDto);
  }

  @Get('me')
  getProfile(@Request() req) {
    // This endpoint is protected by the global JwtAuthGuard
    return req.user;
  }
}
