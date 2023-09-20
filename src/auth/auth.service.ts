import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import RegisterDto from './dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  // register
  async register(body: RegisterDto) {
    await this.prisma.user.create({
      data: {
        name: body.name,
        password: await hash(body.password),
      },
    });
    return await this.token(body);
  }
  // login
  async login(body: LoginDto) {
    const { password } = await this.prisma.user.findFirst({
      where: {
        name: body.name,
      },
    });
    const isVerify = await verify(password, body.password);
    if (!isVerify)
      throw new HttpException(
        { errors: '账号或密码错误' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return await this.token(body);
  }
  // token
  private async token(data: any) {
    return {
      token: await this.jwt.signAsync(data),
      expiresIn: this.config.get('token_expiresIn'),
      createTime: Date.now(),
    };
  }

  // token 解密
  decrypt(req: any) {
    console.log(req.user);
    return req.user.name;
  }
}
