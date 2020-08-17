import { Component, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  post : any ={};
  postId : string = "";
  constructor(public activatedRoute : ActivatedRoute, public ngZone : NgZone) {

    let postId = activatedRoute.snapshot.paramMap.get("postId");
    this.postId = activatedRoute.snapshot.paramMap.get("postId");
    firebase.firestore().collection("posts").doc(postId).get().then((postSnap)=>{

      this.ngZone.run(()=>{

        this.post = postSnap.data();
        console.log(this.post)

      })
      

    })
   }

  ngOnInit(): void {
  }

}
