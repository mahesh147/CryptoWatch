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
    return this.email.hasError('required') ? 'You must enter an email id' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  getErrorMessagepass() {
    return this.password.hasError('required') ? 'You must enter a password' :
    '';
  }
  loginWithEmail() {

    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      console.log(this.user);
      this.authService.loginEmailPassword(this.user.email, this.user.password)
        .then((res) => {
          console.log(res);
              this.router.navigate(['dashboard']);
            })
        .catch((err) => {console.log('error:' + err );
            this.error = err;
      });
    }




  }

  loginWithGoogle() {
    this.authService.authenticateWithGoogle()
      .then((res) => {
        console.log(res);
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {console.log(error); this.error = error; });
  }

  loginWithFacebook() {
    this.authService.authenticateWithFacebook()
      .then((res) => {
        console.log(res);
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {console.log(err); this.error = err; });
  }

  loginWithGithub() {
    this.authService.authenticateWithGithub()
      .then((res) => {
        console.log(res);
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {console.log(err); this.error = err; });
  }

  loginWithTwitter() {
    this.authService.authenticateWithTwitter()
      .then((res) =>  {
        console.log(res);
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {console.log(err); this.error = err; });
  }
}
