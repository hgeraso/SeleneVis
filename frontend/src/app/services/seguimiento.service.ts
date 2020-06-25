import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  constructor(private http:HttpClient) { }

  getGeneralStatics(): Observable<object> {
    return this.http.get<object>(environment.URL_BASE + "statistics");
  }

  getGeneralStaticsByUserAndCourse(body ): Observable<object> {
    return this.http.post<object>(environment.URL_BASE + "statistics", body);
  }

}
