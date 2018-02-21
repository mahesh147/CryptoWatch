// This function is used to manage, update and display the Bitcoin prices.

import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { BitcoinLivePriceService } from './bitcoin-live-price.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.component.html',
  styleUrls: ['./bitcoin.component.css']
})
export class BitcoinComponent implements OnInit {

  // These variable are used to store the prices.
    bitcoinUnocoinINR: number;
    bitcoinCCCAGGINR: number;
    bitcoinCCCAGGUSD: number;
    bitcoinCoinbaseUSD: number;
    bitcoinKrakenUSD: number;
    bitcoinRemitanoINR: number;

    timerID: string; // TimerID is stored in this variable

    // These variables are used to display whether a particular bitcoin price is been fetched 
    fetchingPricesUnoINR: string;
    fetchingPricesCCCINR: string;
    fetchingPricesCCCUSD: string;
    fetchingPricesCoinUSD: string;
    fetchingPricesKraUSD: string;
    fetchingPricesRemINR: string;

  //  These variables are used to store the status of the Bitcoin
    comparePricesUnoINR: string;
    comparePricesCCCINR: string;
    comparePricesCCCUSD: string;
    comparePricesCoinUSD: string;
    comparePricesKraUSD: string;
    comparePricesRemINR: string;

    name: string;
    photoURL: any;

  constructor(
    private st: SimpleTimer,
    private bitcoinLivePrice: BitcoinLivePriceService,
    private router: Router,
    private authService: AuthService
  ) {
    const userInfo = authService.getCurrentUserInfo();
    this.name = userInfo.displayName;
    this.photoURL = userInfo.photoURL;
  this.comparePricesUnoINR = '-';
  this.comparePricesCCCINR = '-';
  this.comparePricesCCCUSD = '-';
  this.comparePricesCoinUSD = '-';
  this.comparePricesKraUSD = '-';
  this.comparePricesRemINR = '-';
  }

  ngOnInit() {

      this.st.newTimer('10sec', 10);
      this.subscribeToTimer();
  }

  subscribeToTimer() {
    // The 10 second timer is subscribed in this function.

    console.log('Subscribed to timer in Bitcoin');
    this.timerID = this.st.subscribe('10sec', () => {
      console.log('10 seconds has passed! Getting the new market prices');
      this.fetchingPricesUnoINR = 'Fetching data...';
      this.fetchingPricesCCCINR = 'Fetching data...';
      this.fetchingPricesCCCUSD = 'Fetchind data...';
      this.fetchingPricesCoinUSD = 'Fetching data...';
      this.fetchingPricesKraUSD = 'Fetching data...';
      this.fetchingPricesRemINR = 'Fetching data...';
      this.fetchNewPrices();
    });
  }

  unsubscribeToTimer() {

    // The timer is unsubscribed in this function.
      this.fetchingPricesUnoINR = '';
      this.fetchingPricesCCCINR = '';
      this.fetchingPricesCCCUSD = '';
      this.fetchingPricesCoinUSD = '';
      this.fetchingPricesKraUSD = '';
      this.fetchingPricesRemINR = '';
    this.st.unsubscribe(this.timerID);
    this.st.delTimer('10sec');
    console.log('Unsubscribed to timer in Bitcoin!');
  }

  goToEthereum() {
    // navigates the user to the Ethereum component
    this.unsubscribeToTimer();
    this.router.navigate(['ethereum']);
  }

  goToRipple() {
    // navigates the user to the Ripple component
    this.unsubscribeToTimer();
    this.router.navigate(['ripple']);
  }
  logout() {

    // This function is used to logout the user.
    this.unsubscribeToTimer();
    this.authService.logout()
    .then((res) => this.router.navigate(['/']));
  }
  goToDashboard() {
    // navigates the user back to dashboard
    this.unsubscribeToTimer();
    this.router.navigate(['dashboard']);
  }

  fetchNewPrices() {

    /* This function is used to fetch the new bitcoin market price.
        After each price is fetched the previous prices are compared with the new ones.
        If there is any change in prices it is set to the comparePrices variable */


    this.bitcoinLivePrice.getUnocoinBitcoinLivePrice().subscribe (
      data => {
        this.fetchingPricesUnoINR = '';
        if (this.bitcoinUnocoinINR < data.INR) {
          this.comparePricesUnoINR = 'Prices went up by:' + ( data.INR - this.bitcoinUnocoinINR ).toFixed(3) + ' INR';
        } else if ( this.bitcoinUnocoinINR> data.INR) {
          this.comparePricesUnoINR = 'Prices went down by:' + (this.bitcoinUnocoinINR  - data.INR).toFixed(3) + ' INR';
        } else if (this.comparePricesUnoINR === '-') {
          this.comparePricesUnoINR = 'No change in market price';
        }
        this.bitcoinUnocoinINR = data.INR;
      },
      error => console.log('An error occured while getting Unocoin prices')
    );






    this.bitcoinLivePrice.getCCCAGG_INR_BitcoinLivePrice().subscribe (
      data => {
          this.fetchingPricesCCCINR = '';

          if (this.bitcoinCCCAGGINR < data.INR) {
            // tslint:disable-next-line:max-line-length
            this.comparePricesCCCINR = 'Price Aggregate went up by : ' + ( data.INR - this.bitcoinCCCAGGINR).toFixed(3) + ' INR';
          } else if ( this.bitcoinCCCAGGINR > data.INR ) {
            // tslint:disable-next-line:max-line-length
            this.comparePricesCCCINR = 'Price Aggregate went down by : ' + (this.bitcoinCCCAGGINR - data.INR).toFixed(3) + ' INR';
          } else if (this.comparePricesCCCINR === '-') {
            this.comparePricesCCCINR = 'No change in market price';
          }

          this.bitcoinCCCAGGINR = data.INR;
        },
      error => console.log('An error occured while getting CCCAGG prices')
    );






    this.bitcoinLivePrice.getCCCAGG_USD_BitcoinLivePrice().subscribe (
      data => {
          this.fetchingPricesCCCUSD = '';
          if (this.bitcoinCCCAGGUSD < data.USD) {
            // tslint:disable-next-line:max-line-length
            this.comparePricesCCCUSD = 'Price Aggregate went up by: ' + (data.USD - this.bitcoinCCCAGGUSD).toFixed(3) + ' USD';
          } else if (this.bitcoinCCCAGGUSD > data.USD) {
            // tslint:disable-next-line:max-line-length
            this.comparePricesCCCUSD = 'Price Aggregate went down by: ' + (this.bitcoinCCCAGGUSD - data.USD).toFixed(3) + ' USD';
          } else if (this.comparePricesCCCUSD === '-') {
            this.comparePricesCCCUSD = 'No change in market price';
          }
          this.bitcoinCCCAGGUSD = data.USD; },
      error => console.log('An error occured while getting CCCAGG prices')
    );







    this.bitcoinLivePrice.getCoinbaseBitcoinLivePrice().subscribe (
      data => {
          this.fetchingPricesCoinUSD = '';
          if (this.bitcoinCoinbaseUSD < data.USD) {
            this.comparePricesCoinUSD = 'Prices went up by: ' + (data.USD - this.bitcoinCoinbaseUSD).toFixed(3) + ' USD';
          } else if (this.bitcoinCoinbaseUSD > data.USD) {
            this.comparePricesCoinUSD = 'Prices went down by: ' + (this.bitcoinCoinbaseUSD - data.USD).toFixed(3) + ' USD';
          } else if (this.comparePricesCoinUSD === '-') {
            this.comparePricesCoinUSD = 'No change in market price';
          }
          this.bitcoinCoinbaseUSD = data.USD; } ,
      error => console.log('An error occured while getting Coinbase prices')
    );







    this.bitcoinLivePrice.getKrakenBitcoinLivePrice().subscribe (
      data => {
          this.fetchingPricesKraUSD = '';
          if (this.bitcoinKrakenUSD < data.USD) {
          this.comparePricesKraUSD = 'Prices went up by: ' + (data.USD - this.bitcoinKrakenUSD).toFixed(3) + ' USD';
          } else if (this.bitcoinKrakenUSD > data.USD) {
            this.comparePricesKraUSD = 'Prices went down by: ' + (this.bitcoinKrakenUSD - data.USD).toFixed(3) + ' USD';
          } else if (this.comparePricesKraUSD === '-') {
            this.comparePricesKraUSD = 'No change in market price';
          }
          this.bitcoinKrakenUSD = data.USD;
        } ,
      error => console.log('An error occured while getting Kraken prices')
    );






    this.bitcoinLivePrice.getRemitanoBitcoinLivePrice().subscribe (
      data => {
          this.fetchingPricesRemINR = '';
          if (this.bitcoinRemitanoINR < data.INR) {
            this.comparePricesRemINR = 'Prices went up by: ' + (data.INR - this.bitcoinRemitanoINR).toFixed(3) + ' INR';
          } else if (this.bitcoinRemitanoINR > data.INR) {
            this.comparePricesRemINR = 'Prices went up by:' + (this.bitcoinRemitanoINR - data.INR).toFixed(3) + ' INR';
          } else if (this.comparePricesRemINR === '-') {
            this.comparePricesRemINR = 'No change in market price';
          }
          this.bitcoinRemitanoINR = data.INR; } ,
      error => console.log('An error ocurred while getting Remitano prices')
    );
  }
}
