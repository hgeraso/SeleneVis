import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginServie: LoginService, private router: Router) { }

  canActivate() {
    if (this.loginServie.isLoged()) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }

}
