
// This component is used to signup the user.

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    user = {
      email: '',
      password: '',
      name: ''
    };
    error: string;
    hide = true;

 // Helper function used for the frontend HTML

    get email() { return this.signupForm.get('email'); }
    get password() { return this.signupForm.get('password'); }
    get name() { return this.signupForm.get('name'); }
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder)  { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group ({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  getErrorMessagename() {
    // Sets the name error messages 
    return this.name.hasError('required') ? 'Please enter your name.' :
      '';
  }
  getErrorMessageemail() {

    // Sets the email error message

    return this.email.hasError('required') ? 'You must enter an email id' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  getErrorMessagepass() {

    // Sets the password error message

    return this.password.hasError('required') ? 'You must enter a password' :
      '';
  }

  signInWithEmail() {
 // This is function is used to signup the user using their Email and Password
    if (this.signupForm.valid) {
      this.user = this.signupForm.value;
      console.log(this.user);
      this.authService.signInRegular(this.user.email, this.user.password)
        .then((res) => {
          console.log(res);
          // This function sets the user's default profile pic.
          this.authService.setUserDefaultProfile(this.user.name)
            .then((response) => {
              console.log(response);
              // If the user is authenticated navigate them to the Dashboard
              this.router.navigate(['dashboard']);
            });
        })
        .catch((err) => { console.log('error:' + err ); this.error = err; });
    }
  }

  signupWithGoogle() {

    // Signup the user using their Google Account 

    this.authService.authenticateWithGoogle()
      .then((res) => {
        console.log(res);
        // If the user is authenticated navigate them to the Dashboard
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {console.log(err); this.error = err; });
  }

  signupWithFacebook() {

    // Signup the user using their Facebook Account.
    this.authService.authenticateWithFacebook()
      .then((res) => {
        console.log(res);
        // If the user is authenticated navigate them to the Dashboard
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {console.log(err); this.error = err; });
  }

  signupWithGithub() {

    // Signup the user using thier Github Account.
    this.authService.authenticateWithGithub()
      .then((res) => {
        console.log(res);
        // If the user is authenticated navigate them to the Dashboard
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {console.log(err); this.error = err; });
  }

  signupWithTwitter() {

    // Signup the user using their Twitter account

    this.authService.authenticateWithTwitter()
      .then((res) => {
        console.log(res);
        // If the user is authenticated navigate them to the Dashboard
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {console.log(err); this.error = err; });
  }
}
