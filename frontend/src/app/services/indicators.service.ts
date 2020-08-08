import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Indicator } from '../models/indicators';
import { Observable } from 'rxjs';
import { StadiscticGraph } from '../models/stadistics-graphs';
import { studentCourse } from '../models/studentCourse';
import { StadisticByControl } from '../models/stadisticByControl';

@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {

  URL_SERVER = environment.URL_BASE;
  indicators:Indicator[];

  constructor( private http:HttpClient ) { }

  getIndicatorsByCourse(course:string):Observable<Indicator[]>{
    return  this.http.post<Indicator[]>(this.URL_SERVER+'indicators/course', {course});
  }

  getStadisticsByCourse(course:string):Observable<StadiscticGraph[]>{
    return this.http.post<StadiscticGraph[]>(this.URL_SERVER + 'course-stadistics', {course})
  }

  getStadisticByDay(body:studentCourse):Observable<StadisticByControl[]>{
    return this.http.post<StadisticByControl[]>(this.URL_SERVER +'statistics/stadistic-day' , body)
  }

  getStadisticBySession(body:studentCourse):Observable<StadisticByControl[]>{
    return this.http.post<StadisticByControl[]>(this.URL_SERVER +'statistics/stadistic-session' , body)
  }

}
