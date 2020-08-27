import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Docente } from 'src/app/models/docente';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { CourseFollowService } from 'src/app/services/course-follow.service';

declare var M: any;

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css'],


})


export class DocentesComponent implements OnInit {

  docente: Docente;
  selected = "example1"
  teacherList: Docente[];
  listCourses:string[];

  columnsToDisplay = ['Nombre', 'Correo', 'Curso', 'Perfil', 'operation'];

  list = [{ name: "Oscar", course: "exploracion", profile: "Docente" },
  { name: "Andres", course: "Agricultura", profile: "Admin" }];

  docenteForm: FormGroup;

  constructor(public docenteService: DocenteService, private toast: MatSnackBar, public dialog: MatDialog, private courses: CourseFollowService) {

    this.docenteForm = new FormGroup({
      '_id': new FormControl(''),
      name: new FormControl('', Validators.required),
      'course': new FormControl('', Validators.required),
      'correo': new FormControl('', [Validators.required, Validators.email]),
      'credencial': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'repeatPassword': new FormControl('', Validators.required)
    })

    // this.getDocentes();

  }

  ngOnInit(): void {
    this.getDocentes();
    this.getCourses();
  }

  get f() { return this.docenteForm.controls; }

  resetForm() {
    this.docenteForm.setValue({
      "_id": "",
      "name": "",
      "course": "",
      "correo": "",
      "credencial": "Seleccione un perfil",
      "password": "",
      "repeatPassword": ""
    })
  }

  addDocente() {

    if(this.docenteForm.controls.password.value !== this.docenteForm.controls.repeatPassword.value){

      this.toast.open("las contraseñas no coinciden",'cerrar', { duration: 2500 });

      return;
    }

    if (this.docenteForm.value._id) {

      this.docenteService.putDocente(this.docenteForm.value).subscribe(res => {

        this.resetForm();
        this.getDocentes();
        this.toast.open('información Guardada', 'Cerrar', { duration: 2500 });

      })

    } else {
      this.docenteService.postDocente(this.docenteForm.value).subscribe(res => {
        this.resetForm();
        this.getDocentes();
        this.toast.open('Docente creado', 'Cerrar', { duration: 2500 });

      })
    }
  };

  getDocentes() {

    this.docenteService.getDocentes().subscribe((res: Docente[]) => {
      this.teacherList = res;
    })

  }

  editDocente(i: number) {

    this.docenteForm.setValue({
      "_id": this.teacherList[i]._id,
      "name": this.teacherList[i].name,
      "course": this.teacherList[i].course,
      "correo": this.teacherList[i].correo,
      "credencial": this.teacherList[i].credencial,
      "password": this.teacherList[i].password,
      "repeatPassword": this.teacherList[i].password
    });
  }


  delDocente(_id: String) {

    Swal.fire({

      title: '¿Eliminar Docente?',
      // text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#542b81',
      cancelButtonColor: '#542b81',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'

    })
      .then((result) => {

        if (result.value) {
          this.docenteService.deleteDocente(_id).subscribe(res => {
            this.getDocentes();
            this.toast.open('Docente Eliminado', 'Cerrar', { duration: 2500 });
          })
        }

      })
  }

  getCourses(){
    this.courses.getCourses().subscribe( courses =>{ this.listCourses = courses })
  }

}
