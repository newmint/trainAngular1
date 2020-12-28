import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {  ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/share.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule
    ],
    exports: []
})

export class AuthModule {}
