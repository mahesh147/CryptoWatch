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

  loginForm: FormGroup;
  user = {
    email: '',
    password: ''
  };
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

  loginWithEmail() {

    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      console.log(this.user);
      this.authService.loginEmailPassword(this.user.email, this.user.password)
        .then((res) => {
          console.log(res);
              this.router.navigate(['dashboard']);
            })
        .catch((err) => console.log('error:' + err ));
    }


  }

  loginWithGoogle() {
    this.authService.authenticateWithGoogle()
      .then((res) => {
        console.log(res);
        this.router.navigate(['dashboard']);
      })
      .catch((error) => console.log(error));
  }
}
