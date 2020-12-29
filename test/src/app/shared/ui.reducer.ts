import { UIActions, START_LOADING, STOP_LOADING } from './ui.actions';

export interface State {
    isLoading: boolean;
}

//object
const initialState: State = {
    isLoading: false
};

export function uiReducer(state = initialState, action:UIActions) {

    //action ต้องมี type 
    switch(action.type) {
        case START_LOADING:
            return {
                isLoading: true
            };
        case STOP_LOADING:
            return {
                isLoading: false
            };
        default :
            return state;
    }

    return state;
}

export const getIsLoading = (state: State) => state.isLoading;