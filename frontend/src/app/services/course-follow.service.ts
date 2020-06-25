import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CourseFollowService {

  constructor(private http:HttpClient) { }

  getCourses():Observable<string[]>{
    return  this.http.get<string[]>(environment.URL_BASE + "seguimiento/courses");
  }
  
}
