import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../../common/user/user.service';

@Controller('v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('login')
  
  login(@Body() params) {
  const token = this.userService.login(params);

  if(!token){
    this.trowException();
  }
  return token;
 }
    private trowException() {
        throw new UnauthorizedException();
    }
}
