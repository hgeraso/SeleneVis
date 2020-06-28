import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { Indicator } from 'src/app/models/indicators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { studentCourse } from 'src/app/models/studentCourse';

@Component({
  selector: 'app-table-stadistics',
  templateUrl: './table-stadistics.component.html',
  styleUrls: ['./table-stadistics.component.css']
})
export class TableStadisticsComponent implements OnInit, OnChanges {

  @Input() indicators: Indicator[];
  @Input() course: string;

  // indicators = [ {name:"carlos", age:"12", cc:"105"} ];
  //    
  columnsToDisplay = ['Estudiante', '#Videos', '#Contenidos', '#Foros', "#Examanes",
    '#Sesiones', "#SesionesDif", "#VideosDif", "T. Examen", "T. Videos", "T. Otros"]

  dataSource: MatTableDataSource<Indicator>

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // MatPaginator Inputs
  pageSizeIndicators = 100
  // this.indicators ? this.indicators.length : 0;
  length = this.pageSizeIndicators;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, this.pageSizeIndicators];

  stadistics:object;
  loading=false;

  constructor() { }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {

    if (this.course && this.indicators) {
      this.buildGraps();
    }

  }

  clear(){
    this.stadistics = null;
  }

  buildGraps() {

    this.loading = true;
    this.dataSource = new MatTableDataSource<Indicator>(this.indicators);
    this.dataSource.paginator = this.paginator;

    this.getStadisticsByIndicators().then((stadiscticsbycourse:object) => {

      this.loading = false;
      this.stadistics = stadiscticsbycourse;
      this.indicators = [];

    }).catch(err => {
      this.loading =false;
      console.log(err)})
  }

  getStadisticsByIndicators() {

    return new Promise((resolve, reject) => {

      const numdocs = this.indicators.length;
      let count = 0;

      if (numdocs) {

        let stadiscticsbycourse = {
          numVideos: 0,
          numContenido: 0,
          numForos: 0,
          numExamenes: 0,
          numSesiones: 0,
          numVideosDiferentes: 0,
          numSesionesDiferentes: 0,
          TimeVideos: 0,
          TimeExam: 0,
          TimeOthers: 0
        }

        // get stadistics of course
        for (const indicator of this.indicators) {
          count++;
          stadiscticsbycourse.numVideos += parseInt(indicator.numVideos);
          stadiscticsbycourse.numContenido += parseInt(indicator.numContenido);
          stadiscticsbycourse.numForos += parseInt(indicator.numForos);
          stadiscticsbycourse.numExamenes += parseInt(indicator.numExamenes);
          stadiscticsbycourse.numSesiones += parseInt(indicator.numSesiones);
          stadiscticsbycourse.numVideosDiferentes += parseInt(indicator.numVideosDiferentes);
          stadiscticsbycourse.numSesionesDiferentes += parseInt(indicator.numSesionesDif);
          stadiscticsbycourse.TimeVideos += parseInt(indicator.timeVideos);
          stadiscticsbycourse.TimeExam += parseInt(indicator.timeExam);
          stadiscticsbycourse.TimeOthers += parseInt(indicator.timeOthers);
        }
        if (count == numdocs) {
          resolve(stadiscticsbycourse);
        }
      } else {
        reject({})
      }

    })
  }

}
