import { Injectable } from '@nestjs/common';
import randomstring = require('randomstring');
import { UserToken } from './user-token';


@Injectable()

export class UserTokenService {
    
    getToken() {
       return  new UserToken(this.generateToken());
    }

    generateToken() {
        return randomstring.generate();
    }
}
