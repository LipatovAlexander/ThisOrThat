import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.usersService.register(
      registerUserDto.username,
      registerUserDto.password,
    );
  }
}
