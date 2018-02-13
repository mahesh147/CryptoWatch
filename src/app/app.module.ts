import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { SimpleTimer } from 'ng2-simple-timer';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BitcoinComponent } from './bitcoin/bitcoin.component';
import { BitcoinLivePriceService } from './bitcoin/bitcoin-live-price.service';
import { appRoutes } from '../routes';
import { RippleComponent } from './ripple/ripple.component';
import { RippleLivePriceService } from './ripple/ripple-live-price.service';
import { EthereumComponent} from './ethereum/ethereum.component';
import { EthereumLivePriceService } from './ethereum/ethereum-live-price.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BitcoinComponent,
    RippleComponent,
    EthereumComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    BitcoinLivePriceService,
    RippleLivePriceService,
    SimpleTimer,
    EthereumLivePriceService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
