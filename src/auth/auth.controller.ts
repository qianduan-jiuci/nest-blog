import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import RegisterDto from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.auth.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.auth.login(body);
  }

  @Post('token')
  @UseGuards(AuthGuard('jwt'))
  decrypt(@Req() req: Request) {
    return this.auth.decrypt(req);
  }
}
