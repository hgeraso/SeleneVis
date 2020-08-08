import { Component, OnInit, Input } from '@angular/core';
import { Network, DataSet, Node, Edge } from 'vis';
import { GrafosService } from 'src/app/services/grafos.service';
import { Grafo, item } from 'src/app/models/grafos';
import { studentCourse } from 'src/app/models/studentCourse';
import { IndicatorsService } from 'src/app/services/indicators.service';
import { StadiscticGraph } from 'src/app/models/stadistics-graphs';
import { Indicator } from 'src/app/models/indicators';
import { StadisticByControl } from 'src/app/models/stadisticByControl';

@Component({
  selector: 'app-estadisticos',
  templateUrl: './estadisticos.component.html',
  styleUrls: ['./estadisticos.component.css']
})
export class EstadisticosComponent implements OnInit {

  public nodes: Node;
  public edges: Edge;
  public GrafoSec: Network;
  // public GrafoInt: Network;

  body: studentCourse = { course: '', student: '' };
  grafoService: Grafo = { edges: [], nodes: [], options: [] };
  optionSelected = '';
  stadisticsGeneral: StadisticByControl[];

  labelTable: string;
  stadistics: object;
  cleanByRound = true;

  constructor(private grafosService: GrafosService, private servicesStadistics: IndicatorsService) {
  }

  ngOnInit(): void { }

  // === get grafos general ===
  getGrafos(body: studentCourse) {

    this.clearallGraphics()
    this.body = body;
    const student = this.body.student.split('_');
    this.labelTable = student[0] + ' ' + student[1]

    this.getGrafosByDay();

  }

  // === when select another option ===
  getGrafoByOption(option) {
    const nodeOnOption = this.grafoService.edges.find(objedge => objedge.day === option);
    const stadisticsOption = this.stadisticsGeneral.find(objInd => objInd.control === option);
    this.createNetwork(nodeOnOption);
    this.createStadistics(stadisticsOption);
  }

  // === By session ===
  getGrafosBySession() {
    this.grafosService.getGrafosBySession(this.body).subscribe((grafo: Grafo) => {

      this.grafoService = grafo
      this.createNetwork(grafo.edges[0]);
    })

    this.servicesStadistics.getStadisticBySession(this.body).subscribe(data => {
      this.stadisticsGeneral = data;
      this.createStadistics(data.find(obj => obj.control === this.optionSelected))
    })

  }

  veropcion(event) {
    console.log(event)
  }

  // === By Day ===
  getGrafosByDay() {
    // console.log(stadisticsByControl);

    this.grafosService.getGrafosByDay(this.body).subscribe((grafo: Grafo) => {
      this.grafoService = grafo;
      this.createNetwork(grafo.edges[0]);
    })

    this.servicesStadistics.getStadisticByDay(this.body).subscribe(data => {
      this.stadisticsGeneral = data;
      this.createStadistics(data.find(obj => obj.control === this.optionSelected));
    })
  }


  createStadistics(stadisticsByControl: StadisticByControl) {
    this.stadistics = stadisticsByControl.data;
  }

  clear() {

    this.stadistics = null;
    this.body.student = '';
    this.stadisticsGeneral = [];
    this.optionSelected = '';

    this.clearallGraphics();
  }

  clearallGraphics() {
    if (this.GrafoSec) {
      this.GrafoSec.destroy();
      // this.GrafoInt.destroy();
    }
  }

  clearStadistic() {
    this.stadistics = null;
  }

  //create graphs
  createNetwork(nodesOnOptions: item) {
<<<<<<< HEAD
=======

    this.optionSelected = this.grafoService.options[0];
>>>>>>> aldair

    const nodes = new DataSet(this.grafoService.nodes)
    // const nodes = new DataSet([
    //   { id: 1, label: 'Node 1' },
    // ]);

    const edges = new DataSet(nodesOnOptions.nodes);
    const edges2 = new DataSet(nodesOnOptions.nodesOrder);
    // create an array with edges
    // const edges = new DataSet([
    //   { from: 1, to: 3 },
    // ]);

    // create a network
    // const container2 = document.getElementById('mynetwork');
    const container = document.getElementById('mynetwork');

    const data = {
      nodes: nodes,
      edges: edges
    };

<<<<<<< HEAD
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
  getGrafoByOption(option) {
    const nodeOnOption = this.grafoService.edges.find(objedge => objedge.day === option);
    this.createNetwork(nodeOnOption);
  }

  // === By session ===
  getGrafosBySession() {
    this.grafosService.getGrafosBySession(this.body).subscribe((grafo: Grafo) => {
      console.log("grafos por session", grafo)

      this.grafoService = grafo
      this.createNetwork(grafo.edges[0]);
    })
  }
  // === By Day ===
  getGrafosByDay() {
    this.grafosService.getGrafosByDay(this.body).subscribe((grafo: Grafo) => {
      console.log("grafos por dia", grafo)
      this.grafoService = grafo
      this.createNetwork(grafo.edges[0]);
    })
  }

  loadStadistics() {

    this.servicesStadistics.getStadisticsByCourse(this.body.course).subscribe(stadistics => this.createStadistics(stadistics))
  }
  //create Stadistics
  createStadistics(vectors: StadiscticGraph[]) {

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
=======
    const data2 = {
      nodes: nodes,
      edges: edges2
    };

>>>>>>> aldair
    const options = {
      nodes: {
        shape: "circle",
        font: {
          size: 20,
          color: "#6e6e6e",
          strokeColor: '#ffffff',
          strokeWidth: 4
        }
      },
<<<<<<< HEAD
      orientation: "top",
      start: vectors[0].x,
      end: vectors[(vectors.length - 1)].x
=======
      interaction: { hover: true },
      edges: {
        arrows: 'to',
        font: {
          color: '#000',
          size: 15,
          strokeColor: '#ffffff',
          align:'horizontal'
        },
        shadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.5)',
          size: 10,
          x: 5,
          y: 5
        },
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18
        },
        maxVelocity: 146,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: { iterations: 10 }
      }
>>>>>>> aldair
    };

    const options2 = {
      interaction: { hover: true },
      edges: { arrows: 'to' },
      physics: { enabled: false, }
    };

    this.GrafoSec = new Network(container, data2, options);
    // this.GrafoInt = new Network(container2, data2, options);

  }

}
