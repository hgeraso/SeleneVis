import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service'
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Docente } from 'src/app/models/docente';

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

  list = [{ name: "Oscar", course:"exploracion", id:"1059365214", profile:"Docente" }];
  columnsToDisplay = ['Nombre', 'Curso', 'Cedula', 'Perfil', 'operation'];

  docenteForm: FormGroup;

  constructor(public docenteService: DocenteService) {

    this.docenteForm = new FormGroup({
      'name': new FormControl('Aldair'),
      'course': new FormControl(''),
      'identification': new FormControl(''),
      'profile': new FormControl(''),
      'password': new FormControl(''),
      'repeatPassword': new FormControl('')
    })

  }

  ngOnInit(): void {
    this.getDocentes();
    console.log(document.getElementById('selcredential'));
    console.log("ya se cargo el ts");
    //var instance = M.FormSelect.getInstance(document.getElementById('selcredential'));


  }

  saveDocent() {
    console.log(this.docenteForm.value['profile']);

  }

  resetForm(form?: NgForm) {
    if (form) {
      M.updateTextFields();
      form.reset();
      this.docenteService.selectedDocente = new Docente();
      M.FormSelect.init(document.getElementById('selcredential'));
    }
  }

  addDocente(form: NgForm) {

    if (form.value._id) {
      this.docenteService.putDocente(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'User update successfuly!' });
          this.getDocentes();
          var instancee = M.FormSelect.getInstance(document.getElementById('selcredential'));
          console.log("estos son los valores", instancee.getSelectedValues())
          M.FormSelect.init(document.getElementById('selcredential'));



        })
    } else {
      this.docenteService.postDocente(form.value)
        .subscribe(res => {
          this.resetForm(form);

          M.toast({ html: 'User saved successfuly!' });
          this.getDocentes();
          M.updateTextFields();

        })
      console.log(form.value);
    }


  };

  getDocentes() {
    this.docenteService.getDocentes()
      .subscribe(res => {
        this.docenteService.docentes = res as Docente[];
        console.log(res);
      })
  }

  editDocente(docente: Docente) {
    this.docenteService.selectedDocente = docente;
  }


  delDocente(_id: String) {
    if (confirm('are you sure you want to delete it?')) {
      this.docenteService.deleteDocente(_id)
        .subscribe(res => {
          this.getDocentes();
          M.toast({ html: 'User deleted successfuly!' });

        })
    }

  }


}
