import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() registerUserDto: RegisterUserDto): Promise<UserDto> {
    return await this.usersService.create(
      registerUserDto.username,
      registerUserDto.password,
    );
  }
}
