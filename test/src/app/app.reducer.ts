import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface State {
    ui: fromUI.State;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer
}

//เอาไว้สร้าง method getUIState ที่จะให้
//ข้อมูลจาก บรรทัดที่ 5 ด้วย reducer บรรทัดที่ 9 อย่างรวดเร็วโดยไม่ต้องไปไล่หา
//ถ้ามีเยอะๆ จะเห็นผลชัด
export const getUIState = createFeatureSelector<fromUI.State>('ui');

//เอาไว้สร้าง method getIsLoading ที่จะ return isLoading จาก UI ออกมาให้
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);