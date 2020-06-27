import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { Indicator } from 'src/app/models/indicators';
import { studentCourse } from 'src/app/models/studentCourse';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.css']
})
export class BarsComponent implements OnInit, OnChanges {

  loading = false;
  selectUser = false;
  localLabel = '';

  @Input() labelTitle: string = '';
  @Input() stadistics: object;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = ['# videos', 'T. Examenes', 'T. otros', 'T. video', 'contenido', '# examenes', '# foros', '# sesiones', 'sesiones', 'videos'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [];


  constructor(private staticsservice: SeguimientoService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {

    if (this.labelTitle && Object.values(this.stadistics).length) {
      this.localLabel = this.labelTitle;
      this.loadStatics()
    }
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  loadStatics() {
    console.log("en bars statdisctics", this.stadistics)

    let dataset = { data: Object.values(this.stadistics), label: this.labelTitle, backgroundColor: '#' + this.randomColor() };
    this.barChartData.push(dataset);

    let keys = Object.keys(this.stadistics);
    this.barChartLabels = keys;
    this.stadistics = {}
  }

  clear() {
    this.barChartData = [];
    this.stadistics = {};
    this.localLabel = '';
  }


  randomColor(): string {
    return Math.floor(Math.random() * 16777215).toString(16);
  }


  // normalization(statics: object):number[] {

  //   const values = Object.values(statics);
  //   // const values = [5,15,12,18,28];
  //   const sumtotalValues = values.reduce((a: number, b: number) => a + b, 0);
  //   const media = sumtotalValues / values.length;
  //   const valuesSquare = [];
  //   const valueNormalize = [];

  //   values.forEach(value => {
  //     valuesSquare.push(Math.pow((value - media), 2))
  //   })

  //   const variance = Math.sqrt( (valuesSquare.reduce( (a: number, b: number) => a + b, 0)/ (values.length -1)) );

  //   values.forEach( x =>{
  //     let valueN = ( (x-media)/variance ) > 0 ? ( (x-media)/variance ) : 0;

  //     valueNormalize.push(valueN );
  //   })

  //   // console.log(media, variance, valueNormalize);
  //   return valueNormalize;
  // }

}
