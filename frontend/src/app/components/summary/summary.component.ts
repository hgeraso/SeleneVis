import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { Curso } from 'src/app/models/curso';
import { NgForm } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { CourseFollowService } from 'src/app/services/course-follow.service';
import { SeguimientoService } from '../../services/seguimiento.service';
import { IndicatorsService } from 'src/app/services/indicators.service';
import { Indicator } from 'src/app/models/indicators';
import { studentCourse } from 'src/app/models/studentCourse';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})

export class SummaryComponent implements OnInit {

  indicators: Indicator[];
  stadistics: object;
  body: studentCourse = { course: '', student: '' };
  labelTable: string;
  course: string;
  loading=false;
  loadingIndicators=false;

  constructor(private inicatorsCourseService: IndicatorsService, private staticsservice: SeguimientoService) {
  }

  ngOnInit() { }

  loadIndicatorsByCourse(course: string) {
    this.loadingIndicators = true;
    this.course = course;
    this.inicatorsCourseService.getIndicatorsByCourse(course).subscribe(indicators => {
      this.loadingIndicators = false;
      this.indicators = indicators;
    }, err => {
      this.loadingIndicators=false;
      console.log(err);
    })
  }

  setBody(body: studentCourse) {
    this.body = body;
    this.loadStadisticStudent();
    const student = this.body.student.split('_');
    this.labelTable = student[0] + ' ' + student[1]
  }

  loadStadisticStudent() {
    this.loading=true;
    this.staticsservice.getGeneralStaticsByUserAndCourse(this.body).subscribe(stadistics => {
      this.loading = false;
      this.stadistics = stadistics})
  }

  clear(event){
    console.log("limpiar data", event);
    this.stadistics = null;
  }


}
