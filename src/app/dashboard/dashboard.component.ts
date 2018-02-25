// This component is used as a Dashboard for the authenticated user.

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name: string;
  photoURL: any;
  constructor(
    private authService: AuthService,
    private router: Router) {
      // This functions runs to get the user profile pic and display name.
    const userInfo = authService.getCurrentUserInfo();
    this.name = userInfo.displayName;
    this.photoURL = userInfo.photoURL;
  }

  ngOnInit() {
  }

  logout() {
 
    // This function is used to logout the user.

    this.authService.logout()
    .then((res) => this.router.navigate(['/']));
  }
}
