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
import { StadiscticGraph } from 'src/app/models/stadistics-graphs';
// import { Network, DataSet, Node, Edge, IdType, Graph2d } from 'vis';
import * as vis from 'vis';


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
  loading = false;
  loadingIndicators = false;

  existGraph = false;
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
      this.loadingIndicators = false;
      console.log(err);
    })

    this.loadStadisticsByCourse();
  }

  setBody(body: studentCourse) {
    this.body = body;
    this.loadStadisticStudent();
    const student = this.body.student.split('_');
    this.labelTable = student[0] + ' ' + student[1]
  }

  loadStadisticStudent() {
    this.loading = true;
    this.staticsservice.getGeneralStaticsByUserAndCourse(this.body).subscribe(stadistics => {
      this.loading = false;
      this.stadistics = stadistics
    })
  }

  clear(event) {
    console.log("limpiar data", event);
    this.stadistics = null;
  }

  loadStadisticsByCourse() {

    this.loadingIndicators = true;
    this.inicatorsCourseService.getStadisticsByCourse(this.course).subscribe(data => this.createStadisticsCourse(data))
  }

  createStadisticsCourse(vectors: StadiscticGraph[]) {

    let graph2d;

    // let names = ["SquareShaded", "Bargraph", "Blank", "CircleShaded"];
    let groups = new vis.DataSet();

    // groups.add({
    //   id: 0,
    //   content: names[0],
    //   className: "custom-style1",
    //   options: {
    //     drawPoints: {
    //       style: "square", // square, circle
    //     },
    //     shaded: {
    //       orientation: "bottom", // top, bottom
    //     },
    //   },
    // });

    // groups.add({
    //   id: 1,
    //   content: names[1],
    //   className: "custom-style2",
    //   options: {
    //     style: "bar",
    //     drawPoints: { style: "circle", size: 10 },
    //   },
    // });

    // groups.add({
    //   id: 2,
    //   content: names[2],
    //   options: {
    //     yAxisOrientation: "right", // right, left
    //     drawPoints: false,
    //   },
    // });

    // groups.add({
    //   id: 3,
    //   content: names[3],
    //   className: "custom-style3",
    //   options: {
    //     yAxisOrientation: "right", // right, left
    //     drawPoints: {
    //       style: "circle", // square, circle
    //     },
    //     shaded: {
    //       orientation: "top", // top, bottom
    //     },
    //   },
    // });

    let container = document.getElementById("visualization");
    container.innerHTML="";

    let items = vectors;

    let dataset = new vis.DataSet(items);

    let options = {
      defaultGroup: "",
      dataAxis: {
        showMinorLabels: true,
        right: {
          title: {
            text: "actividades",
          },
        },
      },
      legend: { left: { position: "top-left" } },
      start: vectors[0].x,
      end: vectors[(vectors.length - 1)].x
    };

    
    graph2d = new vis.Graph2d(container, dataset, groups, options);
    
    
    graph2d.on('rangechange', function (props) {
      graph2d.redraw()
    });
    
  }

}
