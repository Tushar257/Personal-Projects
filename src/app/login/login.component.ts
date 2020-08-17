import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AuthService} from '../auth.service';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import {Router} from '@angular/router'
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm : FormGroup
  message : string = "";
  userError : any;

  
  constructor(public fb:FormBuilder , public authService : AuthService, public router : Router) {

    this.myForm = this.fb.group({

      email: ['',Validators.required],
      password: ['',Validators.required]

    })
   }

  login(form){

    let email : string= form.value.email;
    let password : string = form.value.password;
    this.authService.login(email,password)
    .then((response)=>{

      this.message = "Logged in successfully"
      this.router.navigate(['/myblogs'])
    })
    .catch((error)=>{
      this.userError = error;
      console.log(error);
      
    })


  }
  ngOnInit(): void {
  }

}
