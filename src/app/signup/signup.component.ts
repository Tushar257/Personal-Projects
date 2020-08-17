import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'
import {AuthService} from '../auth.service';
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm : FormGroup
  message : string ="";
  userError : any ; 
  loader : boolean = false;
  passwordMatch : boolean;
  constructor(public fb:FormBuilder , public authService : AuthService) {

    this.myForm = this.fb.group({
      firstName :['', [Validators.required]],
      lastName :['',[Validators.required]],
      email : ['',[Validators.required]],
      password :['',[Validators.required, Validators.minLength(8)]],
      confirmPassword :['',[Validators.required]]
    },
    {
      validator : this.checkPasswordMatching("password","confirmPassword")

    })
  }
  
  checkPasswordMatching(passwordKey : string , confirmPasswordKey : string) 
  {
    return(group:FormGroup)=>{

      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey]

      if (password.value == confirmPassword.value) {
        this.passwordMatch = true;
        return;
      }
      else {
        this.passwordMatch = false;
        confirmPassword.setErrors({match : false})
      }
    }

  }

   onSubmit(form){
     let email : string = form.value.email;
     let password : string = form.value.password;
     let firstName : string = form.value.firstName;
     let lastName : string = form.value.lastName;
     this.loader = true;
     this.authService.signup(email,password,firstName,lastName)
     .then((user: any)=>
     { 
         firebase.firestore().collection("users").doc(user.uid).set({
           firstName : form.value.firstName,
           lastName :  form.value.lastName,
           email :  form.value.email,
           photoURL : user.photoURL,
           interests : "",
           bio : ""
         })
         .then(()=>{

          this.message = "You've been successfully signed up. Please login to your account"
          this.loader = false;
         })
      })
    .catch((error)=>{
      console.log("Error : "+ error);
      this.userError = error;
      this.loader = false;
    })
   }

  ngOnInit(): void {
  }

}
