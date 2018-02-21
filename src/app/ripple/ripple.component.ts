// This function is used to manage, update and display the Ripple prices

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
// These variable are used to store the prices.
  rippleBTCXIndiaINR: number;
  rippleBitstampUSD: number;
  rippleCCCAGGINR: number;
  rippleCCCAGGUSD: number;
  rippleKrakenUSD: number;

  timerID: string; // TimerID is stored in this variable

  name: string;
  photoURL: any;

  // These variables are used to display whether a particular ripple price is been fetched 

  fetchingPricesBTCXINR: string;
  fetchingPricesBitUSD: string;
  fetchingPricesCCCUSD: string;
  fetchingPricesCCCINR: string;
  fetchingPricesKraUSD: string;
//  These variables are used to store the status of the Ripple
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
    this.comparePricesBTCXINR =  '-';
    this.comparePricesBitUSD = '-';
    this.comparePricesCCCUSD = '-';
    this.comparePricesCCCINR = '-';
    this.comparePricesKraUSD = '-';

    }

  ngOnInit() {
    this.st.newTimer('10sec', 10);
    this.subscribeToTimer();
  }

  subscribeToTimer() {
    // The 10 second timer is subscribed in this function.
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
// The timer is unsubscribed in this function.
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
    // navigates the user to the Bitcoin component
    this.unsubscribeToTimer();
    this.router.navigate(['bitcoin']);
  }

  goToEthereum() {
    // navigates the user to the Ethereum component
    this.unsubscribeToTimer();
    this.router.navigate(['ethereum']);
  }

  goToDashboard() {
    // navigates the user back to dashboard
    this.unsubscribeToTimer();
    this.router.navigate(['dashboard']);
  }
  logout() {

    // This function is used to logout the user.
    this.unsubscribeToTimer();
    this.authService.logout()
    .then((res) => this.router.navigate(['/']));
  }
  fetchNewPrices() {

    /* This function is used to fetch the new ripple market price.
        After each price is fetched the previous prices are compared with the new ones.
        If there is any change in prices it is set to the comparePrices variable */

    this.rippleLivePrice.getBTCXIndiaRippleLivePrice().subscribe (
    data => { this.fetchingPricesBTCXINR = '';
      if (this.rippleBTCXIndiaINR < data.INR) {
          this.comparePricesBTCXINR = 'Prices went up by:' + (data.INR - this.rippleBTCXIndiaINR).toFixed(3) + ' INR';
      } else if (this.rippleBTCXIndiaINR > data.INR) {
        this.comparePricesBTCXINR = 'Prices went down by:'  + (this.rippleBTCXIndiaINR - data.INR).toFixed(3) + ' INR';
      } else if (this.comparePricesBTCXINR === '-'){
        this.comparePricesBTCXINR = 'No change in market price';
      } 
      this.rippleBTCXIndiaINR = data.INR; 
      } ,
    error => console.log('An error occured while getting BTCXIndia prices')
    );




    this.rippleLivePrice.getBitstampRippleLivePrice().subscribe (
      data => { this.fetchingPricesBitUSD = '';
      if (this.rippleBitstampUSD < data.USD) {
        this.comparePricesBitUSD = 'Prices went up by:' + (data.USD - this.rippleBitstampUSD).toFixed(3) + ' USD';
      } else if (this.rippleBitstampUSD > data.USD) {
        this.comparePricesBitUSD = 'Prices went down by:' + (this.rippleBitstampUSD - data.USD).toFixed(3) + ' USD';
      } else if (this.comparePricesBitUSD === '-'){
      this.comparePricesBitUSD = 'No change in market price';
    } 
      this.rippleBitstampUSD = data.USD; } ,
      error => console.log('An error occured while getting Bitstamp prices')
    );





    this.rippleLivePrice.getCCCAGGRippleLivePriceINR().subscribe (
      data => { this.fetchingPricesCCCINR = '';
      if (this.rippleCCCAGGINR < data.INR) {
        this.comparePricesCCCINR = 'Price Aggregate went up by : ' + (data.INR - this.rippleCCCAGGINR).toFixed(3) + ' INR';
      } else if (this.rippleCCCAGGINR > data.INR) {
        // tslint:disable-next-line:max-line-length
        this.comparePricesCCCINR = 'Price Aggregate went down by : ' + (this.rippleCCCAGGINR - data.INR).toFixed(3) + ' INR';
      } else if (this.comparePricesCCCINR === '-'){
        this.comparePricesCCCINR = 'No change in market price';
      } 
      this.rippleCCCAGGINR = data.INR;
    } ,
      error => console.log('An error occured while getting CCCAGG prices')
    );


  this.rippleLivePrice.getCCCAGGRippleLivePriceUSD().subscribe (
    data => { this.fetchingPricesCCCUSD = '';
    if (this.rippleCCCAGGUSD < data.USD) {
      this.comparePricesCCCUSD = 'Price Aggregate went up by : ' + (data.USD - this.rippleCCCAGGUSD).toFixed(3) + ' USD';
    } else if (this.rippleCCCAGGUSD > data.USD) {
      this.comparePricesCCCUSD = 'Price Aggregate went down by : ' + (this.rippleCCCAGGUSD - data.USD).toFixed(3)  + ' USD';
    } else if (this.comparePricesCCCUSD === '-'){
      this.comparePricesCCCUSD = 'No change in market price';
    } 
      this.rippleCCCAGGUSD = data.USD;
    } ,
    error => console.log('An error occured while getting CCCAGG prices')
  );

  this.rippleLivePrice.getKrakenRippleLivePriceUSD().subscribe (
    data => { this.fetchingPricesKraUSD = '';
    if (this.rippleKrakenUSD < data.USD) {
      this.comparePricesKraUSD = 'Prices went up by:' + (data.USD - this.rippleKrakenUSD).toFixed(3) + ' USD';
    } else if (this.rippleKrakenUSD > data.USD) {
      this.comparePricesKraUSD = 'Prices went down by:' + (this.rippleKrakenUSD - data.USD).toFixed(3) + ' USD';
    } else if (this.comparePricesKraUSD === '-') {
      this.comparePricesKraUSD = 'No change in market price';
    } 
    this.rippleKrakenUSD = data.USD; } ,
    error => console.log('An error ocurred while getting Kraken prices')
  );
  }

}
