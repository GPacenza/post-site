import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { ChartService} from '../chart.service'
import * as _ from 'lodash'
// import * as Plotly from 'plotly.js'

import * as Plotly from 'plotly.js/dist/plotly.js';
import {Config, Data, Layout} from 'plotly.js/dist/plotly.js';
import { environment } from './../environments/environment';
const firebase = require("firebase");
require("firebase/firestore");

@Component({
  selector: 'plant-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})

export class GraphComponent implements OnInit {

  @ViewChild('chart') el: ElementRef;

  constructor() { }

  ngOnInit() {
    this.basicChart()
  }


  basicChart() {
    firebase.initializeApp(environment.firebaseConfig);

    var db = firebase.database();
    const element = this.el.nativeElement;
    var plant = localStorage.getItem("plantName").replace(/ /g, "");
    console.log("plant => ", plant);
    const ref = db.ref(plant);

    var x1 = new Array();
    var y1 = new Array();
    var y2 = new Array();
    var y3 = new Array();
    var y4 = new Array();

    ref.limitToLast(20).on('value', function(snapshot) {
      var nodeData;
      var entries = []

      snapshot.forEach(function(childSnapshot) {
        nodeData = childSnapshot.val();
        x1.push(nodeData["timeFinished"]);
        y1.push(nodeData['rawWaterTurbidity']);
        y2.push(nodeData['settledWaterTurbidity']);
        y3.push(nodeData['filteredWaterTurbidity1']);
        y4.push(nodeData['coagulantDose']);
      });


      const trace1 = {
       type: "scattergl",
       mode: "lines",
       name: 'Raw Water Turbidity',
       x: x1,
       y: y1,
       line: {color: '#17BECF'}
       }
        const trace2 = {
       type: "scattergl",
       mode: "lines",
       name: 'Settled Water Turbidity',
       x: x1,
       y: y2,
       line: {color: '#7F7F7F'}
       }
        const trace3 = {
       type: "scattergl",
       mode: "lines",
       name: 'Filtered Water Turbidity',
       x: x1,
       y: y3,
       line: {color: '#66ff66'}
       }
        const trace4 = {
       type: "scattergl",
       mode: "lines",
       name: 'Coagulant Dose',
       yaxis: "y2",
       x: x1,
       y: y4,
       line: {color: '#CCFF66'}
       }
       const data1 = [trace1,trace2,trace3,trace4]
       const layout1 =
     {
     "title": "Plant Data",
     "autosize": true,
     "yaxis": {
      "title": "Turbidity (NTU)",
      "type": "linear",
      "side":"left"
     },
     "yaxis2": {
      "title": "mg/L",
      "overlaying": "y",
      "anchor": "x",
      "type": "linear",
      "side": "right"
     },
     "xaxis": {
      "title": "Date",
      "type": "date",
      "rangeslider": {
        "bordercolor": "#444",
        "thickness": 0.15,
        "bgcolor": "white",
        "borderwidth": 0,
        "autorange": true
       }
     },
     "legend": {
      "y": 1,
      "x": 1.1266666666666667
     },
     }
       Plotly.newPlot(element, data1, layout1);
    });
  }
}
