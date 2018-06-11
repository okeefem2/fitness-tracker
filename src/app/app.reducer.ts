import { uiReducer, UIState, getUIIsLoading } from './shared/ui.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authReducer, getAuthIsAuthenticated } from './auth/auth.reducer';

export interface State {
    ui: UIState,
    auth: AuthState
}

export const reducers: ActionReducerMap<State> = {
    ui: uiReducer,
    auth: authReducer
}

// Get quick access to ui state
export const getUIState = createFeatureSelector<UIState>('ui');
// Pass pointer to the getUIState selector function, and a function to do something with the result of the selector
// In this case we are just unpacking the state object for isLoading
export const getIsLoading = createSelector(getUIState, getUIIsLoading);

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getIsAuthenticated = createSelector(getAuthState, getAuthIsAuthenticated);
