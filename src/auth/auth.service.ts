import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getOneItemByUsername(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const loggedInUser = JSON.parse(JSON.stringify(user._doc));
    delete loggedInUser.password;
    return {
      data: {
        token: {
          access_token: this.jwtService.sign(payload),
          token_type: 'Bearer',
        },
        user: loggedInUser,
      },
    };
  }
}
