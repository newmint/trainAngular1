import { Subject } from 'rxjs/Subject';

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random()*10000).toString()
        }
        //คล้ายๆ emit แต่ emit ใช้กับ EventEmit
        this.authChange.next(true);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random()*10000).toString()
        }
        this.authChange.next(true);
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
    }

    getUser() {
        //ส่ง clone/copy ของ user ไป ป้องกันการถูกแก้ไข
        return {...this.user};
    }

    isAuth() {
        return this.user != null;
    }
}