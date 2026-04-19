import { Body, Controller, Get, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../common/decorators/public.decorator';
import { SetupDto } from './auth.setup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //////////////////////////////////////////////////////
  // SETUP (FULL SAAS BOOTSTRAP)
  //////////////////////////////////////////////////////
  @Public()
  @Post('setup')
  setup(@Body() body: SetupDto) {
    return this.authService.setup(body);
  }

  //////////////////////////////////////////////////////
  // LOGIN
  //////////////////////////////////////////////////////
  @Public()
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.username, body.password);
  }

  //////////////////////////////////////////////////////
  // CURRENT USER
  //////////////////////////////////////////////////////
  @Get('me')
  me(@Req() req: any) {
    if (!req.user?.sub) {
      throw new UnauthorizedException(); // ✅ correct
    }

    return this.authService.me(req.user.sub);
  }

  //////////////////////////////////////////////////////
  // CHECK SETUP STATUS
  //////////////////////////////////////////////////////
  @Public()
  @Get('check-setup')
  checkSetup() {
    return this.authService.checkSetup();
  }
}
