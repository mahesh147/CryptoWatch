import { Routes } from '@angular/router';
import { BitcoinComponent } from './app/bitcoin/bitcoin.component';
import { EthereumComponent } from './app/ethereum/ethereum.component';
import { HomeComponent } from './app/home/home.component';

export const appRoutes:Routes = [
 { path: 'home', component: HomeComponent },
 { path: 'bitcoin', component: BitcoinComponent },
 { path: 'ethereum', component: EthereumComponent },
 { path: '', redirectTo: '/home', pathMatch: 'full'},
];