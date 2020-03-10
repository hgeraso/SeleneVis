import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  readonly URL_API='http://localhost:4000/api/seguimiento/students';

  constructor( private http: HttpClient) { }

  getstudents(){
    return this.http.get(this.URL_API)
  }

}
