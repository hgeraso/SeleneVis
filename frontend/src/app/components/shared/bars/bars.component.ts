import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { SeguimientoService } from 'src/app/services/seguimiento.service';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.css']
})
export class BarsComponent implements OnInit, OnChanges {

  @Input() student:any = {};

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

  public barChartLabels: Label[] = ['# videos','T. Examenes', 'T. otros', 'T. video', 'contenido', '# examenes', '# foros', '# sesiones', 'sesiones',  'videos'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];

  constructor(private staticsservice: SeguimientoService) {

    this.loadStatics();
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
    console.log("change", this.student);
    
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
    this.staticsservice.getGeneralStatics().subscribe(statics => {

      console.log(statics)

      let dataset = { data: Object.values(statics), label: 'server' , backgroundColor: 'green'};
      this.barChartData.push(dataset);

      let keys = Object.keys(statics);
      this.barChartLabels = keys;

    });
  }

}
