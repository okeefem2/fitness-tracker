import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingActions, SET_AVAILABLE_EXERCISES, SET_FINISHED_EXERCISES, START_EXERCISE, STOP_EXERCISE } from './training.actions';
import { Exercise } from './exercise.model';
import { State } from '../app.reducer';
import { createFeatureReducerFactory } from '@ngrx/store/src/utils';

export interface TrainingState {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeExercise: Exercise;
}

// This will be merged with the app state behind the scenes
export interface LazyState extends State {
  training: TrainingState;
}

const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeExercise: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_EXERCISES:
        // Need to return the old state with the new value else you will lose the existing state
            return {
              ...state,
              availableExercises: action.payload
            };
        case SET_FINISHED_EXERCISES:
            return {
              ...state,
              finishedExercises: action.payload
            };
        case START_EXERCISE:
            return {
              ...state,
              activeExercise: { ...state.availableExercises.find(ex => ex.id === action.payload) }
            };
        case STOP_EXERCISE:
            return {
              ...state,
              activeExercise: null
            };
        default:
            return state;
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => {
  return state.availableExercises;
});

export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => {
  return state.finishedExercises;
});

export const getActiveExercise = createSelector(getTrainingState, (state: TrainingState) => {
  return state.activeExercise;
});

export const getIsExercsing = createSelector(getTrainingState, (state: TrainingState) => {
  return state.activeExercise != null;
});


