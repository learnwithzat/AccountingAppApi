// src/seed/seed.service.ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private userService: UserService) {}

  async onApplicationBootstrap() {
    const username = 'demo';
    const password = '123456';
    const exists = await this.userService.findByUsername(username);
    if (exists) return;

    await this.userService.create({
      username,
      password: await bcrypt.hash(password, 10),
    });
    console.log('🔥 Demo user created: demo / 123456');
  }
}
