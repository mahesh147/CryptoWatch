
// This is component is used to login the user

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  user = {
    email: '',
    password: ''
  };
  error: string;
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group ({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  getErrorMessageemail() {
    // The error messages gets set
    return this.email.hasError('required') ? 'You must enter an email id' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  getErrorMessagepass() {
    // The error message gets passed
    return this.password.hasError('required') ? 'You must enter a password' :
    '';
  }
  loginWithEmail() {

      // This function is used to login the user using email
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      console.log(this.user);
      this.authService.loginEmailPassword(this.user.email, this.user.password)
        .then((res) => {
          console.log(res);
          // If the user is authenticated the app navigates to the dashboard
              this.router.navigate(['dashboard']);
            })
        .catch((err) => {console.log('error:' + err );
            this.error = err;
      });
    }




  }

  loginWithGoogle() {

    // This function is used to login the user using their Google account
    this.authService.authenticateWithGoogle()
      .then((res) => {
        console.log(res);
        // If the user is authenticated the app navigates to the dashboard
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {console.log(error); this.error = error; });
  }

  loginWithFacebook() {

    // This function is used to login the user using their Facebook account

    this.authService.authenticateWithFacebook()
      .then((res) => {
        console.log(res);
        // If the user is authenticated the app navigates to the dashboard
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {console.log(err); this.error = err; });
  }

  loginWithGithub() {

    // This function is used to authenticate the user using theri Github account.

    this.authService.authenticateWithGithub()
      .then((res) => {
        console.log(res);
        // If the user is authenticated the app navigates to the dashboard
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {console.log(err); this.error = err; });
  }

  loginWithTwitter() {

    // This function is used to authenticate the user using their Twitter Account
    this.authService.authenticateWithTwitter()
      .then((res) =>  {
        console.log(res);
        // If the user is authenticated the app navigates to the dashboard
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {console.log(err); this.error = err; });
  }
}
