import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router,
                private afAuth: AngularFireAuth
        ) {}

    registerUser(authData: AuthData) {
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result=>{
            console.log(result);
            this.authSuccessfully();
        })
        .catch(error=>{
            console.log(error);
        })
    }

    login(authData: AuthData) {
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result=>{
            console.log("login ok");
            console.log(result);
            this.authSuccessfully();
        })
        .catch(error=>{
            
        console.log(authData.email);
            console.log("login fail");
            console.log(error);
        })
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