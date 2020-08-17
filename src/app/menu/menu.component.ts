import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loggedIn :boolean = false
  user : any;
  constructor() {

    this.user = firebase.auth().currentUser;
    console.log(this.user)
    if(this.user) {
      this.loggedIn = true;
    }
    else{
      this.loggedIn = false;
    }
  
    firebase.auth().onAuthStateChanged((user)=>{
      this.user=user;

      if(user) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }
    })
   }

  ngOnInit(): void {
  }

  logout() { 
    firebase.auth().signOut();
  }

}
