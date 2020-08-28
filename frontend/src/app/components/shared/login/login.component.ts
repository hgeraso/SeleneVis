import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private loginService:LoginService, private toast: MatSnackBar, private router: Router ) {

    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  login(){
    // console.log(this.loginForm.value)
    // console.log(this.loginForm.controls.email.errors)
    this.loginService.login(this.loginForm.value).subscribe( res =>{
      
        this.router.navigate(['/stadistics']);

      }, err => {
        // console.log(err)
        this.toast.open(err.error.message, 'Cerrar', { duration: 2500 });
      })
  }
}
