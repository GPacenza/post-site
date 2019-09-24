import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
const firebase = require("firebase");
require("firebase/firestore");

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {

    // if (auth.user){
      // console.log("you're already logged in!", auth.user)
      // alert("You're already logged in!")
    // }

  }

  // loginGoogle() {
  //   this.auth.googleLogin()
  // }

  loginGoogle() {
    var firebase = require("firebase/app");
    if (firebase.auth().currentUser){
      this.auth.signOut()
      document.getElementById("loginout").innerHTML = "Suscribase con Gmail"
    } else{
      this.auth.googleLogin()
      if (firebase.auth().currentUser){
        document.getElementById("loginout").innerHTML = "Suscribase con Gmail"
      }

    }
      // We want to log in with google
      // get information from firebase on whether or not user has registered plants
      // if not, immediately redirect the user by calling some redirect function
    //}
  }

  addUser(){
    // firebase.initializeApp({
    //   apiKey: "AIzaSyAXe0rjDTHgcoUSsP9u5NtiwNf92VL_oI4",
    //   authDomain: "post-visualize-development.firebaseapp.com",
    //   projectId: "post-visualize-development"
    // });
    var db = firebase.firestore();
    var form = document.getElementsByTagName("FORM")[0];
    var inputs = form.getElementsByTagName("INPUT");
    var nme = inputs[0]["value"];
    var mail = inputs[1]["value"];
    var pswd = inputs[2]["value"];
    if (pswd != inputs[3]["value"]){
      alert("Las contraseñas son diferentes. Tienen que ser iguales.");
      return;
    }
    var mID = inputs[4]["value"];
    var plantForm = document.getElementsByTagName("FORM")[1];
    var plantBoxes = plantForm.getElementsByTagName("INPUT");
    var plnts = [];


    // fill plants with the checked plants
    for (let plant of Array.from(plantBoxes)){
      if ((<HTMLInputElement>document.getElementById((<HTMLInputElement>plant).value)).checked){
        plnts.push((<HTMLInputElement>plant).value)
      }
    }
    if (nme==""){
      alert("Usted necesita dar su nombre para suscribirse.");
      return;
    }
    var docID = ""
    if (mail==""){
      docID = mID;
    }else{
      docID = mail;
    }
    if (docID == ""){
      alert("Usted necesita dar o una dirección de correo electronico o su nombre de usuario de Facebook.");
      return;
    }

    if(pswd==""){
      alert("Usted necesita usar una contraseña para suscribirse.");
      return;
    }

    if (plnts.length == 0){
      alert("Usted necesita seleccionar una planta.");
      return;
    }
    db.collection("users").doc(docID).set({
        name: nme,
        email: mail,
        password: pswd,
        messengerID: mID,
        plants: plnts
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docID);
    }).then(()=>{
      this.router.navigate(['my-subscribed'])
    }).catch(function(error) {
        console.error("Error adding document: ", error);
        alert("Hubo un error. Intente de nuevo más tarde.")
    });
    return;
  }

  ngOnInit() {
    // firebase.initializeApp({
    //   apiKey: "AIzaSyAXe0rjDTHgcoUSsP9u5NtiwNf92VL_oI4",
    //   authDomain: "post-visualize-development.firebaseapp.com",
    //   projectId: "post-visualize-development"
    // });
    // var firebase = require("firebase/app")
    // if (firebase.auth().currentUser){
    //   document.getElementById("loginout").innerHTML = "Logout";//"Login with Google"
    // }else{
    //   document.getElementById("loginout").innerHTML = "Suscribase con Gmail";//"Logout"
    // }
  }

}


//after login, user redirected to this page, submits plant info, and is redirected
//to page of the first selected plant

// Do we want user to have to do this every time?
// Create new field in DB to keep track of whether or not user has done this
// When user first submits data, set field to true
// Every subsequent login, check the value of this field before having the user
// submit the form
// Add a component/form for the user to update their preferences
// Link for this component should only be accessible if user is logged in
