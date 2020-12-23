import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

//ทำให้ service สามารถถูก inject ได้
//ในที่นี้ให้ router   inject
@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router) {}

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random()*10000).toString()
        }
        this.authSuccessfully();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random()*10000).toString()
        }
        this.authSuccessfully();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        //ส่ง clone/copy ของ user ไป ป้องกันการถูกแก้ไข
        return {...this.user};
    }

    isAuth() {
        return this.user != null;
    }

    private authSuccessfully() {

        //คล้ายๆ emit แต่ emit ใช้กับ EventEmit
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}