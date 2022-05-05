import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  
    baseURL: string = 'http://localhost:3000/';
  
    signupForm = this.formBuilder.group({
      email: '',
      name: '',
      password: '',
      
    });
  
    constructor(private formBuilder: FormBuilder, 
      private http: HttpClient,
      private route: Router
      ) {}
  
    ngOnInit(): void {}
    onSubmit() {
      let person = this.signupForm.value;
      this.http
        .post(this.baseURL + 'api/user/signup', person)
        // .pipe(
        //   map((response: any) => {response.json(),location.href = "/"}),
        //   catchError((e: any) => {
        //     console.log('signup' + e);
        //     return throwError(e);
        //   })
        // )
        .subscribe(()=>{this.route.navigate(['/signin'])})
    }
  }

  // @ViewChild('f', {static: false}) registerForm: NgForm;
  //   username: string = '';
  //   password: string = '';
  //   email: string = '';
  //   confirmPassword: string = '';
  //   constructor(private router: Router, private service: RegisterService) { }
  //   //  On submit click, reset field value

  //   register() {
  //     console.log("hello", this.username);
  //     if (this.username.length === 0) {
  //       alert('username is required');
  //     } else if (this.password.length === 0) {
  //       alert('password is required');
  //     } else if (this.email.length === 0) {
  //       alert('email is required');
  //     } else if (this.confirmPassword.length === 0) {
  //         alert('password is required');
  //     } else {
  //       this.service
  //       .register(this.username, this.password, this.email, this.confirmPassword)
  //       .subscribe((res: any) => {
  //         if (res.username !== null) {
  //           alert('you have successfully registred');
  //           this.router.navigate(['/login']);
  //         } else {
  //           alert('error');
  //         }
  //       });
  //   }
  // }
  // onSubmit() {
  //     this.registerForm.reset();
  // }



