import { Routes } from '@angular/router';
import { AuthGuard } from './app/auth.guard';
import { AuthHomeGuard } from './app/auth-home.guard';
import { BitcoinComponent } from './app/bitcoin/bitcoin.component';
import { RippleComponent } from './app/ripple/ripple.component';
import { HomeComponent } from './app/home/home.component';
import { EthereumComponent } from './app/ethereum/ethereum.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { LoginComponent } from './app/login/login.component';
import { SignupComponent } from './app/signup/signup.component';
import { AboutComponent } from './app/about/about.component';


export const appRoutes: Routes = [
 { path: 'home',
    canActivate: [AuthHomeGuard],
    component: HomeComponent
     },

 { path: 'bitcoin',
    canActivate: [AuthGuard],
    component: BitcoinComponent
    },

 { path: 'ripple',
    canActivate: [AuthGuard],
    component: RippleComponent
     },

 { path: 'ethereum',
    canActivate: [AuthGuard],
    component: EthereumComponent
     },

 { path: 'login',
    canActivate: [AuthHomeGuard],
    component: LoginComponent
     },

 { path: 'signup',
    canActivate: [AuthHomeGuard],
    component: SignupComponent
    },

 { path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
     },

 { path: 'about', component: AboutComponent },

 { path: '',
    canActivate: [AuthGuard],
    redirectTo: '/home',
    pathMatch: 'full'
    }

];
