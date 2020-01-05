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
    console.log("plant => ", plant);
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








    // var url = "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20*%20FROM%201lgxjPxZ8_V6OyA0Wa19iGpuZKKn1mBf1chJOgkqU%20WHERE%20plant%3D%27" + localStorage.getItem("plantName") + "%27%20AND%20rawWaterTurbidity%20>%200%20ORDER%20BY%20timeFinished%20DESC%20LIMIT%20100&key=AIzaSyB4fY4TPsWMhqifu68GFq1aWREjiiAYZmo";
    // const result = await request.get(url);
    // var data = JSON.parse(result);
    // var columns = data.columns;
    // var data_rows = data.rows;
    // console.log(data.columns);
    // console.log(columns.indexOf("timeFinished"));
    // var timeIndex= columns.indexOf("timeFinished");
    // var rwtIndex = columns.indexOf("rawWaterTurbidity");
    // var swtIndex = columns.indexOf("settledWaterTurbidity");
    // var fwtIndex = columns.indexOf("filteredWaterTurbidity1");
    // var cdIndex = columns.indexOf("coagulantDose");
    // for (var i=0; i<data_rows.length; i++){
    //   var row = data_rows[i];
    //   var obj:any = {"timeStamp": row[timeIndex], "rawWaterTurbidity": row[rwtIndex], "settledWaterTurbidity": row[swtIndex], "filteredWaterTurbidity": row[fwtIndex], "coagulantDose": row[cdIndex]};
    //   this.rows.push(<JSON>obj);
    // }

}
}
