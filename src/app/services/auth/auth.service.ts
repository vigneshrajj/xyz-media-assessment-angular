import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import users from 'src/app/config/users';
import { login, logout } from 'src/app/store/actions/auth.actions';
import { StoreShape, User } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private store: Store<StoreShape>) {
    this.checkLoginStatus();
  }

  login(userid: string, password: string) {
    const userDetails = users.find((user) => user.userid === userid && user.password === password);
    if (userDetails) {
      localStorage.setItem('user', JSON.stringify(userDetails));
      this.store.dispatch(login());
    } else {
      throw new Error('Username or password is incorrect');
    }
  }

  checkLoginStatus(): boolean {
    const loggedInUser = this.getUser();
    const isUserValid = !!users.find(
      (user) => user.username === loggedInUser.username && 
                user.password === loggedInUser.password
    );

    if (loggedInUser && isUserValid) {
      this.store.dispatch(login());
      return true;
    } else {
      this.store.dispatch(logout());
      return false;
    }
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}') as User;
  }

  logout() {
    localStorage.removeItem('user');
    this.store.dispatch(logout());
    this.router.navigate(['/home']);
  }
}
