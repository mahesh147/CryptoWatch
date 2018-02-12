import { Routes } from '@angular/router';
import { BitcoinComponent } from './app/bitcoin/bitcoin.component';
import { RippleComponent } from './app/ripple/ripple.component';
import { HomeComponent } from './app/home/home.component';
import { EthereumComponent } from './app/ethereum/ethereum.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { LoginComponent } from './app/login/login.component';
import { SignupComponent } from './app/signup/signup.component';

export const appRoutes: Routes = [
 { path: 'home', component: HomeComponent },
 { path: 'bitcoin', component: BitcoinComponent },
 { path: 'ripple', component: RippleComponent },
 { path: 'ethereum', component: EthereumComponent },
 { path: 'login', component: LoginComponent },
 { path: 'signup', component: SignupComponent },
 { path: 'dashboard', component: DashboardComponent },
 { path: '', redirectTo: '/home', pathMatch: 'full'},
];
