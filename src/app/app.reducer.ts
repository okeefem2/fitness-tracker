import { uiReducer, UIState, getUIIsLoading } from './shared/ui.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    ui: UIState
}

export const reducers: ActionReducerMap<State> = {
    ui: uiReducer
}

// Get quick access to ui state
export const getUIState = createFeatureSelector<UIState>('ui');
// Pass pointer to the getUIState selector function, and a function to do something with the result of the selector
// In this case we are just unpacking the state object for isLoading
export const getIsLoading = createSelector(getUIState, getUIIsLoading);
