import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { Curso } from 'src/app/models/curso';
import { NgForm } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { CourseFollowService } from 'src/app/services/course-follow.service';
import { SeguimientoService } from '../../services/seguimiento.service';
import { IndicatorsService } from 'src/app/services/indicators.service';
import { Indicator } from 'src/app/models/indicators';

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
  indicators: Indicator[];

  body: { course: string, student: string } = { course: '', student: '' };

  constructor(private servicefollow: StudentService, private serviceCourse: CourseFollowService, private statics: SeguimientoService,
    private inicatorsCourseService: IndicatorsService) {

    this.loadCourses();

  }

  ngOnInit() { }


  loadCourses() {
    this.serviceCourse.getCourses().subscribe(coures => {
      this.courses = coures;
    })
  }

  loadStudentsByCourse(course: string) {
    this.body.student = '';
    this.servicefollow.getSrudentsBycourse(course).subscribe(students => this.Students = students);
    this.loadIndicatorsByCourse(course);
  }

  loadIndicatorsByCourse(course: string) {
    this.inicatorsCourseService.getIndicatorsByCourse(course).subscribe( indicators=>{
      this.indicators = indicators;
      console.log("llego los indicadores", this.indicators)
    } )
  }


}
