import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.css']
})
export class BarsComponent implements OnInit, OnChanges {

  loading = false;
  selectUser = false;

  @Input() body: any = {};

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

  constructor(private staticsservice: SeguimientoService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log("change", this.body);

  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // public randomize(): void {
  //   // Only Change 3 values
  //   const data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   this.barChartData[0].data = data;
  // }


  loadStatics() {

    if (this.body.student) {

      this.loading = true;
      this.selectUser = false;
      this.staticsservice.getGeneralStaticsByUserAndCourse(this.body).subscribe(statics => {

        const student = this.body.student.split('_');
        // this.normalization(statics);

        let dataset = { data: Object.values(statics), label: student[0] + ' ' + student[1], backgroundColor: '#' + this.randomColor() };
        this.barChartData.push(dataset);

        let keys = Object.keys(statics);
        this.barChartLabels = keys;
        this.loading = false;

      }, error => {
        this.loading = false;
        Swal.fire("no se puede realizar la consulta");
      })

    } else {
      this.selectUser = true;
    }
  }


  randomColor(): string {
    return Math.floor(Math.random() * 16777215).toString(16);
  }


  normalization(statics: object):number[] {

    const values = Object.values(statics);
    // const values = [5,15,12,18,28];
    const sumtotalValues = values.reduce((a: number, b: number) => a + b, 0);
    const media = sumtotalValues / values.length;
    const valuesSquare = [];
    const valueNormalize = [];

    values.forEach(value => {
      valuesSquare.push(Math.pow((value - media), 2))
    })

    const variance = Math.sqrt( (valuesSquare.reduce( (a: number, b: number) => a + b, 0)/ (values.length -1)) );

    values.forEach( x =>{
      let valueN = ( (x-media)/variance ) > 0 ? ( (x-media)/variance ) : 0;

      valueNormalize.push(valueN );
    })

    // console.log(media, variance, valueNormalize);
    return valueNormalize;
  }

}
