import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js/dist/plotly.js';
import * as request from 'request-promise-native';

import { environment } from './../environments/environment';
const firebase = require("firebase");
require("firebase/firestore");


@Component({
  selector: 'my-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  rows:any = new Array();

  constructor() { }

  ngOnInit() {
    this.getData();
  }


  async getData(){
    // firebase.initializeApp(environment.firebaseConfig);

    var db = firebase.database();
    var plant = localStorage.getItem("plantName").replace(/ /g, "");
    const ref = db.ref(plant);
    var self = this;

    ref.limitToLast(20).on('value', function(snapshot) {
      var nodeData;
      var entries = []

      snapshot.forEach(function(childSnapshot) {
        nodeData = childSnapshot.val();
        var obj:any = {"timeStamp": nodeData["timeFinished"], "rawWaterTurbidity": nodeData['rawWaterTurbidity'], "settledWaterTurbidity": nodeData['settledWaterTurbidity'], "filteredWaterTurbidity": nodeData['filteredWaterTurbidity1'], "coagulantDose": nodeData['coagulantDose']};
        self.rows.push(<JSON>obj);
      });
    }
  }
}
