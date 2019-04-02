import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserTokenService } from './token/user-token.service';
import { UserToken } from './token/user-token';

describe('UserService', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UserService, UserTokenService, UserToken],
    }).compile();
  });

  describe('findUser', () => {
    it('should return User', () => {
      const userService = app.get<UserService>(UserService);
      const paramsFirst = {email:'admin@admin.ru',password:'12345678'};
      const paramsSecond = {email:'user@user.ru', password:'87654321'};
      const [firstUser, secondUser] = userService.getUsers();
      expect(userService.findUser(paramsFirst)).toBe(firstUser);
      expect(userService.findUser(paramsSecond)).toBe(secondUser);
    });
  });
  
  describe('findUser', () => {
    it('should return Undefined', () => {
      const userService = app.get<UserService>(UserService);
      const invalidParams = {email:'www@aaaa.ru', password:'1234098'};
      expect(userService.findUser({})).toBeUndefined();
      expect(userService.findUser(invalidParams)).toBeUndefined();
    });
  });

  describe('login', () => {
    it('should return UserToken', () => {
      const userService = app.get<UserService>(UserService);
      const params = {email:'admin@admin.ru', password:'12345678'};
      expect(userService.login(params)).toBeInstanceOf(UserToken);
    });
  });

  describe('login', () => {
    it('should return null', () => {
      const userService = app.get<UserService>(UserService);
      const invalidParams = {email:'www@aaaa.ru', password:'1234098'};
      expect(userService.login({})).toBeNull();
      expect(userService.login(invalidParams)).toBeNull();
    });
  });
});


