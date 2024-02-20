import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './models/auth.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth)
    private readonly authModel: typeof Auth,
    
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const auth = await this.authModel.findOne({
      where: {
        username,
      },
    });

    // Compare the plain text password with the hashed password
    const isPasswordValid = await bcrypt.compare(pass, auth.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    // Prepare JWT Payload
    const payload = { username: auth.username, userId: auth.userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
