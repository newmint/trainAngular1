import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate, Router, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';

//ตามความเข้าใจคือ injectable ให้ตัวอื่นมา แจมได้
//ในที่นี้อยากใช้ authService เลยต้องให้มันถูก inject
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.authService.isAuth()) {
            return true;
        }else{
            this.router.navigate(['/login']);
        }
    }

    canLoad(route: Route) {
        if(this.authService.isAuth()) {
            return true;
        }else{
            this.router.navigate(['/login']);
        }
    }
}