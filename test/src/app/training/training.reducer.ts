import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import {    TrainingActions, 
            SET_AVAILABLE_TRAININGS, 
            SET_FINISHED_TRAININGS, 
            START_TRAINING, STOP_TRAINING  
        } from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
    availableExercises: Exercise[];
    finishExercises: Exercise[];
    activeTraining: Exercise;
}

//สำหรับ lazy load state
export interface State extends fromRoot.State{
    training: TrainingState;
}

//object
const initialState: TrainingState = {
    availableExercises: [],
    finishExercises: [],
    activeTraining: null
};

export function trainingReducer(state = initialState, action:TrainingActions) {

    //action ต้องมี type 
    switch(action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                //ที่ต้องใส่ state ด้วย เพราะว่า จะได้มี property อื่นๆ ที่ไม่ได้ overwrite มัน
                ...state,
                availableExercises: action.payload
            };
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishExercises: action.payload
            };
        case START_TRAINING:
            return {
                ...state,
                activeTraining: {...state.availableExercises.find(ex => ex.id === action.payload)}
            };
        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            };
        default :
            return state;
    }

    return state;
}

// export const getAvailableTrainings = (state:TrainingState) => state.availableExercises;
// export const getFinishTrainings = (state:TrainingState) => state.finishExercises;
// export const getActiveTraining = (state:TrainingState) => state.activeTraining;


// training ตรงนี้ map กับ ที่ประกาศไว้ที่ training.module.ts
export const getTrainingState = createFeatureSelector<TrainingState>('training');

// ปกติ จะเอาอันนี้ไว้ที่ app.reducer แต่อันนี้ทำ lazy load เลยเรียกที่นี่แทน ข้างบนที่เคยทำไว้ให้ app.reducer เรียกเลยปิดไปได้
// แล้วเอาค่ามาใส่ที่นี่แทน
export const getAvailableTrainings = createSelector(getTrainingState, (state:TrainingState) => state.availableExercises);
export const getFinishTrainings = createSelector(getTrainingState, (state:TrainingState) => state.finishExercises);
export const getActiveTraining = createSelector(getTrainingState, (state:TrainingState) => state.activeTraining);

export const getIsTraining = createSelector(getTrainingState, (state:TrainingState) => state.activeTraining != null);