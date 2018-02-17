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

  fetchingPricesBTCXINR: string;
  fetchingPricesBitUSD: string;
  fetchingPricesCCCUSD: string;
  fetchingPricesCCCINR: string;
  fetchingPricesKraUSD: string;

  comparePricesBTCXINR: string;
  comparePricesBitUSD: string;
  comparePricesCCCUSD: string;
  comparePricesCCCINR: string;
  comparePricesKraUSD: string;

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
      this.fetchingPricesBTCXINR = 'Fetching data...';
      this.fetchingPricesBitUSD = 'Fetching data...';
      this.fetchingPricesCCCUSD = 'Fetching data...';
      this.fetchingPricesCCCINR = 'Fetching data...';
      this.fetchingPricesKraUSD = 'Fetching data...';
      this.fetchNewPrices();
    });
  }

  unsubscribeToTimer() {

    this.fetchingPricesBTCXINR = '';
    this.fetchingPricesBitUSD = '';
    this.fetchingPricesCCCUSD = '';
    this.fetchingPricesCCCINR = '';
    this.fetchingPricesKraUSD = '';

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
    data => { this.fetchingPricesBTCXINR = '';
      if (this.rippleBTCXIndiaINR < data.INR) {
          this.comparePricesBTCXINR = 'Prices went up by:' + (data.INR - this.rippleBTCXIndiaINR) + ' INR';
      } else if (this.rippleBTCXIndiaINR > data.INR) {
        this.comparePricesBTCXINR = 'Prices went down by:'  + (this.rippleBTCXIndiaINR - data.INR) + ' INR';
      } else {
        this.comparePricesBTCXINR = 'No change';
      }
       this.rippleBTCXIndiaINR = data.INR; 
      } ,
    error => console.log('An error occured while getting BTCXIndia prices')
   );




   this.rippleLivePrice.getBitstampRippleLivePrice().subscribe (
     data => { this.fetchingPricesBitUSD = '';
     if (this.rippleBitstampUSD < data.USD) {
       this.comparePricesBitUSD = 'Prices went up by:' + (data.USD - this.rippleBitstampUSD) + ' USD';
     } else if (this.rippleBitstampUSD > data.USD) {
       this.comparePricesBitUSD = 'Prices went down by:' + (this.rippleBitstampUSD - data.USD) + ' USD';
     } else {
       this.comparePricesBitUSD = 'No change';
     }
      this.rippleBitstampUSD = data.USD; } ,
     error => console.log('An error occured while getting Bitstamp prices')
   );

   this.rippleLivePrice.getCCCAGGRippleLivePriceINR().subscribe (
     data => { this.fetchingPricesCCCINR = '';
     if (this.rippleCCCAGGINR < data.INR) {
       this.comparePricesCCCINR = 'Price Aggreate went up by : ' + (data.INR - this.rippleCCCAGGINR) + ' INR';
     } else if (this.rippleCCCAGGINR > data.INR) {
       // tslint:disable-next-line:max-line-length
       this.comparePricesCCCINR = 'Price Aggreate went down by : ' + (this.rippleCCCAGGINR - data.INR) + ' INR';
     } else {
        this.comparePricesCCCINR = 'No change';
     }
      this.rippleCCCAGGINR = data.INR;
    } ,
     error => console.log('An error occured while getting CCCAGG prices')
   );


   this.rippleLivePrice.getCCCAGGRippleLivePriceUSD().subscribe (
    data => { this.fetchingPricesCCCUSD = '';
    if (this.rippleCCCAGGUSD < data.USD) {
      this.comparePricesCCCUSD = 'Price Aggreate went up by : ' + (data.USD - this.rippleCCCAGGUSD) + ' USD';
    } else if (this.rippleCCCAGGUSD > data.USD) {
      this.comparePricesCCCUSD = 'Price Aggreate went down by : ' + (this.rippleCCCAGGUSD - data.USD)  + ' USD';
    } else {
      this.comparePricesCCCUSD = 'No change';
    }
     this.rippleCCCAGGUSD = data.USD;
    } ,
    error => console.log('An error occured while getting CCCAGG prices')
  );

  this.rippleLivePrice.getKrakenRippleLivePriceUSD().subscribe (
    data => { this.fetchingPricesKraUSD = '';
    if (this.rippleKrakenUSD < data.USD) {
      this.comparePricesKraUSD = 'Prices went up by:' + (data.USD - this.rippleKrakenUSD) + ' USD';
    } else if (this.rippleKrakenUSD > data.USD) {
      this.comparePricesKraUSD = 'Prices went down by:' + (this.rippleKrakenUSD - data.USD) + ' USD';
    } else {
      this.comparePricesKraUSD = 'No change';
    }
    this.rippleKrakenUSD = data.USD; } ,
    error => console.log('An error ocurred while getting Kraken prices')
  );
 }

}
