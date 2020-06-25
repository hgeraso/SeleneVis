import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor( private http: HttpClient) { }

  getstudents(){
    return this.http.get(environment.URL_BASE + "seguimiento/students")
  }

  getSrudentsBycourse(course:string):Observable<string[]> {
    return this.http.get<string[]>( environment.URL_BASE + "seguimiento/studentsbycourse/" + course );
  }

}
