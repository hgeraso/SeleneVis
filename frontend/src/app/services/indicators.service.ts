import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Indicator } from '../models/indicators';
import { Observable } from 'rxjs';
import { StadiscticGraph } from '../models/stadistics-graphs';

@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {

  URL_SERVER = environment.URL_BASE + 'indicators/';
  indicators:Indicator[];

  constructor( private http:HttpClient ) { }

  getIndicatorsByCourse(course:string):Observable<Indicator[]>{
    return  this.http.post<Indicator[]>(this.URL_SERVER+'course', {course});
  }

  getStadisticsByCourse(course:string):Observable<StadiscticGraph[]>{
    return this.http.post<StadiscticGraph[]>(this.URL_SERVER + 'course-stadistics', {course})
  }
}
