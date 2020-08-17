import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import * as firebase from 'firebase/app'
import 'firebase/auth';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CapitalizePipe } from './capitalize.pipe';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component'
import {NgxEditorModule} from 'ngx-editor'
import {HttpClientModule} from '@angular/common/http'
import { AngularEditorModule} from '@kolkov/angular-editor';
import { PostComponent } from './post/post.component';
import { ViewComponent } from './view/view.component';
import { CommentComponent } from './comment/comment.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import {QuillModule} from 'ngx-quill'
let firebaseConfig = {
  apiKey: "AIzaSyAG5n-0DZpKvIYwok0yDPFvggnFsEI1Tps",
  authDomain: "scribe-a1c65.firebaseapp.com",
  databaseURL: "https://scribe-a1c65.firebaseio.com",
  projectId: "scribe-a1c65",
  storageBucket: "scribe-a1c65.appspot.com",
  messagingSenderId: "87635347103",
  appId: "1:87635347103:web:c3d78bd1dab5bf61a384aa",
  measurementId: "G-02GBF6HL1Z"
}

firebase.initializeApp(firebaseConfig)

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    CapitalizePipe,
    MenuComponent,
    MyblogsComponent,
    ProfileComponent,
    CreateComponent,
    PostComponent,
    ViewComponent,
    CommentComponent,
    EditProfileComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxEditorModule,
    HttpClientModule,
    AngularEditorModule,
    QuillModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
