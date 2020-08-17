import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  user : any = {};
  posts : any[]=[];

  constructor() {
    
    this.user = firebase.auth().currentUser;
    this.getPosts();
  
  }
  getPosts(){

    firebase.firestore().collection("posts").orderBy("created","desc").get().then((querySnapshots)=>{

      console.log(querySnapshots.docs)
      this.posts=querySnapshots.docs;
    })
    .catch((error)=>{

      console.log(error)

    })
  }

  onPostCreated(){

    this.posts=[];
    this.getPosts();

  }

  onDelete() {

    this.posts=[];
    this.getPosts();
  }
  ngOnInit(): void {
  }

}