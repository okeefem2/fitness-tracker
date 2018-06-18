import { Action } from '@ngrx/store';
import { AuthActions, LOGIN, LOGOUT } from './auth.actions';

export interface AuthState {
    isAuthenticated: boolean;
}

const initialState = {
    isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case LOGIN:
            return {
                isAuthenticated: true
            };
        case LOGOUT:
            return {
                isAuthenticated: false
            };
        default:
            return state;
    }
}

export const getAuthIsAuthenticated = (state: AuthState) => {
  return state.isAuthenticated;
};
