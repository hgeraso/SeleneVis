import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { Curso } from 'src/app/models/curso';
import { NgForm } from '@angular/forms';
import { StudentService } from '../../services/student.service';

declare var M:any;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  Estudiantes:Estudiante[]=[];
  selectEstudiante:Estudiante=new Estudiante('','','');
  Cursos:Curso[]=[];
  selectCurso:Curso=new Curso();


  constructor( private servicefollow : StudentService ) { }

  ngOnInit(): void {

    this.Estudiantes.push(new Estudiante("1","Herman",'moviles'));
    this.Estudiantes.push(new Estudiante("2","David",'moviles'));
    this.Estudiantes.push(new Estudiante("3","Rafa",'moviles'));
    console.log('valor estudiante',this.selectEstudiante);
   
  }
  //funcion temporal para revisar como va el codigo
  ver(form:NgForm){
    console.log(this.selectEstudiante);
    form.reset();
    this.selectEstudiante=new Estudiante('','','');
    M.FormSelect.init(document.getElementById('selectestudiant'));

  }
}
