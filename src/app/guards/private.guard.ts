import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
      if (this.authService.checkLoginStatus()) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
  }
  
}
