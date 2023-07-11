import { createReducer, on } from '@ngrx/store';
import { login, logout } from 'src/app/store/actions/auth.actions';
import { AuthState } from 'src/app/types';

export const initialState: AuthState = {
    isLoggedIn: false,
};

export const authReducer = createReducer(
    initialState,
    on(login, (state) => ({ ...state, isLoggedIn: true })),
    on(logout, (state) => ({ ...state, isLoggedIn: false }))
);