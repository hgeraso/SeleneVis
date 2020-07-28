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
      console.log("paso por el guard del login")
      return true;
    } else {
      console.log("bloqueado por el guard");
      this.router.navigate(['/login'])
      return false;
    }
  }

}
