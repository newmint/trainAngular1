//model โครงสร้างขึ้นอยู่กับว่าเราจะใช้ทำอะไร ตามแต่ต้องการ
export interface State {
    isLoading: boolean;
}

//object
const initialState: State = {
    isLoading: false
};

export function appReducer(state = initialState, action) {

    //action ต้องมี type 
    switch(action.type) {
        case 'START_LOADING':
            return {
                isLoading: true
            };
        case 'STOP_LOADING':
            return {
                isLoading: false
            };
        default :
            return state;
    }

    return state;
}