import { Action } from "@ngrx/store";

export const SET_AUTHENTICATED = '[Auth] Set Athenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';


export class SETAUTHENTICATED implements Action {
    readonly type = SET_AUTHENTICATED;
}

export class SETUNAUTHENTICATED implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SETAUTHENTICATED | SETUNAUTHENTICATED;