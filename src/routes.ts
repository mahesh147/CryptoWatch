import { Routes } from '@angular/router';
import { BitcoinComponent } from './app/bitcoin/bitcoin.component';
import { RippleComponent } from './app/ripple/ripple.component';
import { HomeComponent } from './app/home/home.component';

export const appRoutes:Routes = [
 { path: 'home', component: HomeComponent },
 { path: 'bitcoin', component: BitcoinComponent },
 { path: 'ripple', component: RippleComponent },
 { path: '', redirectTo: '/home', pathMatch: 'full'},
];