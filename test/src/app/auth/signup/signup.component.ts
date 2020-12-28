import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate;
  isLoading =false;
  private loadIngSubs: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService
    ) { }

  ngOnInit(): void {
    this.loadIngSubs = this.uiService.loadingStateChanged.subscribe(isLoad =>{
      this.isLoading = isLoad;
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

  onSubmit(form: NgForm){
    console.log(form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
  ngOnDestroy() {
    if(this.loadIngSubs)
      this.loadIngSubs.unsubscribe();
  }
}
