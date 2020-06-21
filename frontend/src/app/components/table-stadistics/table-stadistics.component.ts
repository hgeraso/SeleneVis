import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { Indicator } from 'src/app/models/indicators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-stadistics',
  templateUrl: './table-stadistics.component.html',
  styleUrls: ['./table-stadistics.component.css']
})
export class TableStadisticsComponent implements OnInit, OnChanges {

  @Input() indicators: Indicator[];
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


  constructor() { }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Indicator>(this.indicators);
    this.dataSource.paginator = this.paginator;


  }

}
