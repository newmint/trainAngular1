import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate, CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators'
import * as fromRoot from '../app.reducer'
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
                private store: Store<fromRoot.State>
                ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //ใน lecture มันใช้ไม่ได้ต้องมีต่อท้าย
        // return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
        return this.store.select(fromRoot.getIsAuthenticated);
    }

    canLoad(route: Route) {
        //ใน lecture มันใช้ไม่ได้ต้องมีต่อท้าย
        // return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
        return this.store.select(fromRoot.getIsAuthenticated);
    }
}