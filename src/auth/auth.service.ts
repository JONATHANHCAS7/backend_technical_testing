import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Usuario hardcodeado para la prueba
  private readonly hardcodedUser = {
    username: 'testuser',
    password: '$2b$10$Xh3sCH7XUf8G8C7y8j1Vgub/mQM9BlVP6DXWquB6mXIYoyiQaGcAO', // bcrypt.hash('password123', 10)
  };

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    if (
      username === this.hardcodedUser.username &&
      (await bcrypt.compare(password, this.hardcodedUser.password))
    ) {
      const { password, ...result } = this.hardcodedUser;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}