import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { RouterModule } from '@angular/router';
import { SimpleTimer } from 'ng2-simple-timer';

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
import { CollapseModule} from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BitcoinComponent,
    RippleComponent,
    EthereumComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    BitcoinLivePriceService,
    RippleLivePriceService,
    SimpleTimer,
    EthereumLivePriceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
