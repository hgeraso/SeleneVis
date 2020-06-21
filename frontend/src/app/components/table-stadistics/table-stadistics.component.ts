import { Component, OnInit, Input } from '@angular/core';
import { Indicator } from 'src/app/models/indicators';

@Component({
  selector: 'app-table-stadistics',
  templateUrl: './table-stadistics.component.html',
  styleUrls: ['./table-stadistics.component.css']
})
export class TableStadisticsComponent implements OnInit {

  // @Input() 
  indicators = [ {name:"carlos", age:"12", cc:"105"} ];
  //    
  columnsToDisplay =['Estudiante', '#Videos', '#Contenidos', '#Foros', "#Examanes", 
  '#Sesiones',"#SesionesDif","#VideosDif", "T. Examen", "T. Videos", "T. Otros"]
  constructor() { }

  ngOnInit(): void {
  }

}
