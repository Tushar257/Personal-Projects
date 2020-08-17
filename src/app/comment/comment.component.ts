import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comment : string = "";
  comments : any[] =[]; 
  loggedIn : boolean = false;

  @Input("postId") postId : string;
  constructor() {
    firebase.auth().onAuthStateChanged((user)=>{

      if(user){
      this.loggedIn=true;
      }
      else {
        this.loggedIn =false;
      }
    })
   }

  ngOnInit(): void {
    this.getComments();
  }

  addComment(){

    if (this.comment.length<5) {

      return;

    }
    else {

      firebase.firestore().collection("comments").add({
        text : this.comment,
        post : this.postId,
        owner : firebase.auth().currentUser.uid,
        name : firebase.auth().currentUser.displayName,
        created : firebase.firestore.FieldValue.serverTimestamp()
      }).then((data)=>{
        this.comment = "";
        this.getComments();
      })
      .catch((error)=>{
        console.log(error)
      })
    }


  }

  getComments(){
    this.comments =[];
    
    firebase.firestore().collection("comments").where("post","==",this.postId).orderBy("created","desc").get().then((data)=>{

      data.docs.forEach((doc)=>{
        this.comments.push(doc.data())
      })
    })
  }

}
