import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user';
import { UserTokenService } from './token/user-token.service';

@Injectable()
export class UserService {
  private users = [
    new User('admin@admin.ru', '12345678'),
    new User('user@user.ru', '87654321'),
  ];

  constructor(
    private readonly userTokenService: UserTokenService,
  ) {}

  login(params){
    const user = this.findUser(params);
    
    if (this.isUserUndefined(user)) {
      return null;
    }
    return  this.userTokenService.getToken();
  }

  findUser(params) {
    const {email, password} =  params;
    return this.getUsers().find(user => user.email == email && user.password == password);
  }

  isUserUndefined(user) {
    return typeof(user) === "undefined" || user === null;
  }

  getUsers(){
    return this.users;
  }
}
