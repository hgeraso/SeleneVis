import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { Docente } from '../models/docente';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL_SERVER = environment.URL_BASE;

  user: Docente;
  token: string;
  isLoged$ = new EventEmitter<Boolean>();
  userRole$ = new EventEmitter<string>();

  constructor(private http: HttpClient, private route: Router) {
    this.loadStorage();
  }

  login(body: { email: string, password: string }): Observable<boolean> {

    return this.http.post<object>(this.URL_SERVER + 'login/', body).pipe(
      map((res: any) => {
        localStorage.setItem('id', res.id);
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.user = res.usuario;
        this.token = res.token;

        return true;
      })
    )
  }

  isLoged() {
    if (this.token.length > 3 && this.user) {
      this.userRole$.emit(this.user.credencial);
      this.isLoged$.emit(true);
      return true;
    } else {
      if (this.user) {
        this.userRole$.emit(this.user.credencial);
        this.isLoged$.emit(false);
      }
      return false;
    }
  }

  logOut() {
    this.token = '';
    this.user = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.route.navigate(['/login']);

    this.isLoged$.emit(false);
  }

  loadStorage() {
    if (localStorage.getItem('token')) {

      this.user = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');

    } else {
      this.token = '';
      this.user = null;
    }
  }
}
