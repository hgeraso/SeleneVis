import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Docente } from '../models/docente';
import {DocentesComponent} from '../components/docentes/docentes.component';



@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  selectedDocente:Docente;
  docentes:Docente[];

  readonly URL_API='http://localhost:4000/api/docentes';

  constructor(private http:HttpClient) {
    this.selectedDocente= new Docente();
  }

  
  getDocentes(){
    return  this.http.get(this.URL_API);
  }

  getDocente(){
    return  this.http.get(this.URL_API);
  }

  postDocente(docente:Docente){
    return this.http.post(this.URL_API,docente);
  }
  putDocente(docente:Docente){
    return this.http.put(this.URL_API +`/${docente._id}`,docente);
  }
  deleteDocente(_id:String){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
