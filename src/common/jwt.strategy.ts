import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secretkey',
    });
  }

  async validate(payload: any): Promise<User> {
    // Fetch the full user from the database to ensure we have the latest profile, roles, and tenant context
    const user = await this.usersService.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    // This returned object is assigned to request.user
    return user;
  }
}
