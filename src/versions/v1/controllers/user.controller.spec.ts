import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserTokenService } from '../../../common/user/token/user-token.service';
import { UserService} from '../../../common/user/user.service';
import { UserToken } from '../../../common/user/token/user-token';
import { UnauthorizedException } from '@nestjs/common';

describe('UserController', () => {
    let app: TestingModule;
  
    beforeAll(async () => {
      app = await Test.createTestingModule({
        controllers: [UserController],
        providers: [UserService, UserTokenService, UserToken],
      }).compile();
    });
  
    describe('login', () => {
      it('should return UserToken', () => {
        const userController = app.get<UserController>(UserController);
        const paramsFirst = {email:'admin@admin.ru',password:'12345678'};
        const paramsSecond = {email:'user@user.ru', password:'87654321'};
        expect(userController.login(paramsFirst)).toBeInstanceOf(UserToken);
        expect(userController.login(paramsSecond)).toBeInstanceOf(UserToken);
      });
    });

    describe('login', () => {
      it('should return UnauthorizedException', () => {
        const userController = app.get<UserController>(UserController);
        const invalidParams = {email:'zzz@rrrr.ru', password:'9087654321'};
        expect(() => userController.login({})).toThrow(UnauthorizedException);
        expect(() => userController.login(invalidParams)).toThrow(UnauthorizedException);
      });
    });
  });
  