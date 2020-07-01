import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Grafo } from '../models/grafos';
import { Observable } from 'rxjs';
import { studentCourse } from '../models/studentCourse';

@Injectable({
  providedIn: 'root'
})
export class GrafosService {

  URL_SERVER = environment.URL_BASE;

  constructor( private http: HttpClient ) { }

  getGrafosByDay(body:object):Observable<Grafo>{
    return this.http.post<Grafo>( this.URL_SERVER + 'grafos', body );
  }

  getGrafosBySession(body:studentCourse):Observable<Grafo>{
    return this.http.post<Grafo>( this.URL_SERVER + 'grafos/sessions', body );
  }

}
