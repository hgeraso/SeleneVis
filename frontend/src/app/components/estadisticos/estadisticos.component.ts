import { Component, OnInit } from '@angular/core';
import { Network, DataSet, Node, Edge, IdType, Graph2d } from 'vis';
import { GrafosService } from 'src/app/services/grafos.service';
import { Grafo } from 'src/app/models/grafos';

@Component({
  selector: 'app-estadisticos',
  templateUrl: './estadisticos.component.html',
  styleUrls: ['./estadisticos.component.css']
})
export class EstadisticosComponent implements OnInit {
  public nodes: Node;
  public edges: Edge;
  public network: Network;

  grafoService: Grafo = { edges: [], nodes: [] };

  constructor(private grafosService: GrafosService) {

  }

  ngOnInit(): void {

    this.grafosService.getGrafosStudent({ course: "Unicauca+Intro_IoT+2019-II", student: "Gustavo_Ramirez_Staff" })
      .subscribe((grafo: Grafo) => {
        console.log("llegan edges", grafo)

        this.grafoService = grafo
        this.createNetwork();

      })

    // this.createStadistics();

  }

  //create graphs
  createNetwork() {

    const nodes = new DataSet(this.grafoService.nodes)
    // const nodes = new DataSet([
    //   { id: 1, label: 'Node 1' },
    //   { id: 2, label: 'Node 2' },
    //   { id: 3, label: 'Node 3' },
    //   { id: 4, label: 'Node 4' },
    //   { id: 5, label: 'Node 5' }
    // ]);

    const edges = new DataSet(this.grafoService.edges[0].nodes)
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
      edges:{arrows:'from'},
      physics:{repulsion:{
        nodeDistance:50
      },
      enabled:false
    }
    };

    const network = new Network(container, data, options);

  }

  //create Stadistics
  createStadistics() {

    const items = [
      { x: "2014-06-11", y: 10, group: 0 },
      { x: "2014-06-12", y: 25, group: 0 },
      { x: "2014-06-13", y: 30, group: 0 },
      { x: "2014-06-14", y: 10, group: 0 },
      { x: "2014-06-15", y: 15, group: 0 },
      { x: "2014-06-16", y: 30, group: 0 },
      { x: "2014-06-11", y: 12, group: 1 },
      { x: "2014-06-12", y: 15, group: 1 },
      { x: "2014-06-13", y: 34, group: 1 },
      { x: "2014-06-14", y: 24, group: 1 },
      { x: "2014-06-15", y: 5, group: 1 },
      { x: "2014-06-16", y: 12, group: 1 },
      { x: "2014-06-11", y: 22, group: 2 },
      { x: "2014-06-12", y: 14, group: 2 },
      { x: "2014-06-13", y: 24, group: 2 },
      { x: "2014-06-14", y: 21, group: 2 },
      { x: "2014-06-15", y: 30, group: 2 },
      { x: "2014-06-16", y: 18, group: 2 }
    ];

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
      start: "2014-06-10",
      end: "2014-06-18"
    };

    var graph2d = new Graph2d(container, items, groups, options);

    graph2d.setOptions(options);

  }

}
