export interface User {
    userid: string;
    password: string;
    username: string;
}

export interface Member {
    name: string;
    designation: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
}

export interface AuthState {
    isLoggedIn: boolean;
}

export interface StoreShape {
    auth: AuthState;
}