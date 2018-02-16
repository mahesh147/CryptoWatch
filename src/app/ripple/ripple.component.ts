import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { RippleLivePriceService } from './ripple-live-price.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.css']
})
export class RippleComponent implements OnInit {

  rippleBTCXIndiaINR: number;
  rippleBitstampUSD: number;
  rippleCCCAGGINR: number;
  rippleCCCAGGUSD: number;
  rippleKrakenUSD: number;

  timerID: string;

  name: string;
  photoURL: any;

  fetchingPricesBTCXINR: boolean;
  fetchingPricesBitUSD: boolean;
  fetchingPricesCCCUSD: boolean;
  fetchingPricesCCCINR: boolean;
  fetchingPricesKraUSD: boolean;

  constructor(private st: SimpleTimer,
    private rippleLivePrice: RippleLivePriceService,
    private router: Router,
    private authService: AuthService) {

    const userInfo = authService.getCurrentUserInfo();
    this.name = userInfo.displayName;
    this.photoURL = userInfo.photoURL;
    }

  ngOnInit() {
    this.st.newTimer('10sec', 10);
    this.subscribeToTimer();
  }

  subscribeToTimer() {
    console.log('Subscribed to Timer in Ripple');
    this.st.subscribe('10sec', () => {
      console.log('10 seconds has passed! Getting the new market prices');
      this.fetchingPricesBTCXINR = true;
      this.fetchingPricesBitUSD = true;
      this.fetchingPricesCCCUSD = true;
      this.fetchingPricesCCCINR = true;
      this.fetchingPricesKraUSD = true;
      this.fetchNewPrices();
    });
  }

  unsubscribeToTimer() {

    this.fetchingPricesBTCXINR = false;
    this.fetchingPricesBitUSD = false;
    this.fetchingPricesCCCUSD = false;
    this.fetchingPricesCCCINR = false;
    this.fetchingPricesKraUSD = false;

    this.st.unsubscribe(this.timerID);
    this.st.delTimer('10sec');
    console.log('Unsubscribed to timer in Ethereum!');
  }

  goToBitcoin() {
    this.unsubscribeToTimer();
    this.router.navigate(['bitcoin']);
  }

  goToEthereum() {
    this.unsubscribeToTimer();
    this.router.navigate(['ethereum']);
  }

  goToDashboard() {
    this.unsubscribeToTimer();
    this.router.navigate(['dashboard']);
  }
  fetchNewPrices() {
    this.rippleLivePrice.getBTCXIndiaRippleLivePrice().subscribe (
    data => { this.fetchingPricesBTCXINR = false; this.rippleBTCXIndiaINR = data.INR; } ,
    error => console.log('An error occured while getting BTCXIndia prices')
   );

   this.rippleLivePrice.getBitstampRippleLivePrice().subscribe (
     data => { this.fetchingPricesBitUSD = false; this.rippleBitstampUSD = data.USD; } ,
     error => console.log('An error occured while getting Bitstamp prices')
   );

   this.rippleLivePrice.getCCCAGGRippleLivePriceINR().subscribe (
     data => { this.fetchingPricesCCCINR = false; this.rippleCCCAGGINR = data.INR; } ,
     error => console.log('An error occured while getting CCCAGG prices')
   );


   this.rippleLivePrice.getCCCAGGRippleLivePriceUSD().subscribe (
    data => { this.fetchingPricesCCCUSD = false; this.rippleCCCAGGUSD = data.USD; } ,
    error => console.log('An error occured while getting CCCAGG prices')
  );

  this.rippleLivePrice.getKrakenRippleLivePriceUSD().subscribe (
    data => { this.fetchingPricesKraUSD = false; this.rippleKrakenUSD = data.USD; } ,
    error => console.log('An error ocurred while getting Kraken prices')
  );
 }

}
