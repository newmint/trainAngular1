import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
  @ViewChild('sidenav')
  mySidenav;

  onToggle(){
    this.mySidenav.toggle();
  }
}
