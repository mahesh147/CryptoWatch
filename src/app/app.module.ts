import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BitcoinComponent,
    RippleComponent,
    EthereumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(appRoutes)
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
