import { Component, OnInit, Input } from '@angular/core';
import { Network, DataSet, Node, Edge, IdType, Graph2d } from 'vis';
import { GrafosService } from 'src/app/services/grafos.service';
import { Grafo, item } from 'src/app/models/grafos';
import { studentCourse } from 'src/app/models/studentCourse';
import { IndicatorsService } from 'src/app/services/indicators.service';
import { StadiscticGraph } from 'src/app/models/stadistics-graphs';

@Component({
  selector: 'app-estadisticos',
  templateUrl: './estadisticos.component.html',
  styleUrls: ['./estadisticos.component.css']
})
export class EstadisticosComponent implements OnInit {

  public nodes: Node;
  public edges: Edge;
  public network: Network;

  body:studentCourse = {course:'', student:''};
  grafoService: Grafo = { edges: [], nodes: [], options:[] };

  constructor(private grafosService: GrafosService, private servicesStadistics: IndicatorsService) {

    // this.grafosService.getGrafosStudent({ course: "Unicauca+Intro_IoT+2019-II", student: "Gustavo_Ramirez_Staff" })
    //   .subscribe((grafo: Grafo) => {

    //     this.grafoService = grafo
    //     this.createNetwork();

    //   })
  }

  ngOnInit(): void {

    // this.createStadistics();

  }

  //create graphs
  createNetwork(nodesOnOptions:item) {

    const nodes = new DataSet(this.grafoService.nodes)
    // const nodes = new DataSet([
    //   { id: 1, label: 'Node 1' },
    //   { id: 2, label: 'Node 2' },
    //   { id: 3, label: 'Node 3' },
    //   { id: 4, label: 'Node 4' },
    //   { id: 5, label: 'Node 5' }
    // ]);

    const edges = new DataSet(nodesOnOptions.nodes);
    // create an array with edges
    // const edges = new DataSet([
    //   { from: 1, to: 3 },
    //   { from: 1, to: 2 },
    //   { from: 2, to: 4 },
    //   { from: 2, to: 5 },
    //   { from: 3, to: 3 }
    // ]);

    // create a network
    const container = document.getElementById('mynetwork');
    const data = {
      nodes: nodes,
      edges: edges
    };
    const options = {
      interaction: { hover: true },
      edges: { arrows: 'to' },
      physics: { enabled: true, },
      // manipulation: {
      //   enabled: true
      // }
    };

    const network = new Network(container, data, options);

    // network.on("showPopup", function (params) {
    //   console.log(params)
    //   document.getElementById("eventSpan").innerHTML =
    //     "<h2>showPopup event: </h2>" + JSON.stringify(params, null, 4);
    // });

  }

  // === get grafos general ===
  getGrafos(body: studentCourse) {
    this.body = body;
    this.grafosService.getGrafosByDay(body).subscribe((grafo: Grafo) => {
      console.log("grafos", grafo)
      this.grafoService = grafo
      // this.createNetwork(grafo.edges[0]);
    })
    // this.loadStadistics()

  }

  // === when select another option ===
  getGrafoByOption(option){
    const nodeOnOption = this.grafoService.edges.find( objedge => objedge.day === option );
    this.createNetwork(nodeOnOption);
  }

  // === By session ===
  getGrafosBySession(){
    this.grafosService.getGrafosBySession(this.body).subscribe((grafo: Grafo) => {
      console.log("grafos por session", grafo)

      this.grafoService = grafo
      this.createNetwork(grafo.edges[0]);
    })
  }
  // === By Day ===
  getGrafosByDay(){
    this.grafosService.getGrafosByDay(this.body).subscribe((grafo: Grafo) => {
      console.log("grafos por dia", grafo)
      this.grafoService = grafo
      this.createNetwork(grafo.edges[0]);
    })
  }

  loadStadistics(){
    
    this.servicesStadistics.getStadisticsByCourse(this.body.course).subscribe( stadistics => this.createStadistics( stadistics ) )
  }
  //create Stadistics
  createStadistics( vectors:StadiscticGraph[] ) {

    const items = vectors;
    // [
    //   { x: "2014-06-11", y: 10, group: 0 },
    //   { x: "2014-06-12", y: 25, group: 0 },
    //   { x: "2014-06-13", y: 30, group: 0 },
    //   { x: "2014-06-14", y: 10, group: 0 },
    //   { x: "2014-06-15", y: 15, group: 0 },
    //   { x: "2014-06-16", y: 30, group: 0 },
    //   { x: "2014-06-11", y: 12, group: 1 },
    //   { x: "2014-06-12", y: 15, group: 1 },
    //   { x: "2014-06-13", y: 34, group: 1 },
    //   { x: "2014-06-14", y: 24, group: 1 },
    //   { x: "2014-06-15", y: 5, group: 1 },
    //   { x: "2014-06-16", y: 12, group: 1 },
    //   { x: "2014-06-11", y: 22, group: 2 },
    //   { x: "2014-06-12", y: 14, group: 2 },
    //   { x: "2014-06-13", y: 24, group: 2 },
    //   { x: "2014-06-14", y: 21, group: 2 },
    //   { x: "2014-06-15", y: 30, group: 2 },
    //   { x: "2014-06-16", y: 18, group: 2 }
    // ];

    let groups = new DataSet();
    groups.add({ id: 0, content: "group0" });
    groups.add({ id: 1, content: "group1" });
    groups.add({ id: 2, content: "group2" });

    const container = document.getElementById("visualization");

    const dataset = new DataSet(items);
    const options = {
      style: "bar",
      stack: false,
      barChart: { width: 50, align: "center", sideBySide: true }, // align: left, center, right
      drawPoints: false,
      dataAxis: {
        icons: true
      },
      orientation: "top",
      start: vectors[0].x,
      end: vectors[(vectors.length-1)].x
    };

    var graph2d = new Graph2d(container, items, groups, options);

    graph2d.setOptions(options);

  }

}
