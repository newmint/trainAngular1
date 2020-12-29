import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;
    private isAuthenticated = false;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService,
                private uiService: UIService,
                private store: Store<fromRoot.State>
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
        
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result=>{
            this.store.dispatch(new UI.StopLoading())
        })
        .catch(error=>{
            
            this.store.dispatch(new UI.StopLoading())
            this.uiService.showSnackbar(error.message, null, 3000);
        })
    }

    login(authData: AuthData) {

        this.store.dispatch(new UI.StartLoading())
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result=>{
            this.store.dispatch(new UI.StopLoading())
        })
        .catch(error=>{
            
            this.store.dispatch(new UI.StopLoading())
            this.uiService.showSnackbar(error.message, null, 3000);
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