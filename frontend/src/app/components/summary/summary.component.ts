import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { Curso } from 'src/app/models/curso';
import { NgForm } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { CourseFollowService } from 'src/app/services/course-follow.service';

declare var M: any;
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  Students: string[] = [];
  courses: string[];

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];


  constructor(private servicefollow: StudentService, private serviceCourse: CourseFollowService) {

    this.loadCourses();

  }

  ngOnInit() { }


  //funcion temporal para revisar como va el codigo
  ver(form: NgForm) {
    form.reset();
    M.FormSelect.init(document.getElementById('selectestudiant'));
  }

  loadCourses() {
    this.serviceCourse.getCourses().subscribe(coures => {
      this.courses = coures;
    })
  }

  loadStudentsByCourse(course:string){
    this.servicefollow.getSrudentsBycourse(course).subscribe( students => this.Students = students );
    
  }
}
