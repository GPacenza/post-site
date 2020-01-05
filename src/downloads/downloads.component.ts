import { Component, OnInit } from '@angular/core';
import * as request from 'request-promise-native';

import { environment } from './../environments/environment';
const firebase = require("firebase");
require("firebase/firestore");

@Component({
  selector: 'my-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  content:any = new Array();

  constructor() { }

  ngOnInit() {
  }

  async getData(){
    var db = firebase.database();
    var plant = localStorage.getItem("plantName").replace(/ /g, "");
    const ref = db.ref(plant);
    var self = this;

    ref.on('value', function(snapshot) {
      var nodeData;
      var entries = []

      snapshot.forEach(function(childSnapshot) {
        nodeData = childSnapshot.val();
        var csv_row = new Array([nodeData["timeFinished"], nodeData['rawWaterTurbidity'], nodeData['settledWaterTurbidity'], nodeData['filteredWaterTurbidity1'], nodeData['coagulantDose']])
        self.content.push(csv_row);
      });

      var csvContent = "data:text/csv;charset=utf-8";
      csvContent += "filler, Time Finished,Raw Water Turbidity (NTU),Settled Water Turbidity (NTU), Filtered Water Turbidity (NTU), Coagulant Dose (mg/L)\n";
      for (var j=0; j<self.content.length; j++){
        var entry = self.content[j].join(",");
        csvContent += entry + "\n"
      }

      var encoded = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encoded);
      link.setAttribute("download", localStorage.getItem("plantName") + "_Data.csv");
      document.body.appendChild(link);
      link.click();

    }
  }

}
