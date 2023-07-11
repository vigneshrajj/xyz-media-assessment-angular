import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StoreShape } from 'src/app/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  { 
  showModal = false;
  isLoggedIn = false;
  username = '';

  constructor(private store: Store<StoreShape>, private authService: AuthService) {
    this.store.select((store) => store.auth.isLoggedIn).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn)
        this.username = this.authService.getUser().username;
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  logout() {
    this.authService.logout();
  }
}
