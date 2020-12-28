import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;
    private isAuthenticated = false;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService,
                private snackBar: MatSnackBar
        ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if(user) {

                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }else{

                this.trainingService.cancelSubscription();
                this.user = null;
                this.authChange.next(false);
                this.isAuthenticated = false;
                this.router.navigate(['/login']);
            }
        })
    }

    registerUser(authData: AuthData) {
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result=>{
        })
        .catch(error=>{
            // console.log(error);
            this.snackBar.open(error.message, null, {
                duration: 3000
            })
        })
    }

    login(authData: AuthData) {
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result=>{
        })
        .catch(error=>{
            
            // console.log(authData.email);
            // console.log("login fail");
            // console.log(error);
            this.snackBar.open(error.message, null, {
                duration: 3000
            })
        })
    }

    logout() {
        this.afAuth.signOut();
    }

    getUser() {
        //ส่ง clone/copy ของ user ไป ป้องกันการถูกแก้ไข
        return {...this.user};
    }

    isAuth() {
        // return this.user != null;
        return this.isAuthenticated;
    }

}