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


   bitcoinUnocoinINR: number;
   bitcoinCCCAGGINR: number;
   bitcoinCCCAGGUSD: number;
   bitcoinCoinbaseUSD: number;
   bitcoinKrakenUSD: number;
   bitcoinRemitanoINR: number;

   timerID: string;

   fetchingPricesUnoINR: string;
   fetchingPricesCCCINR: string;
   fetchingPricesCCCUSD: string;
   fetchingPricesCoinUSD: string;
   fetchingPricesKraUSD: string;
   fetchingPricesRemINR: string;

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
  this.comparePricesUnoINR = '';
  this.comparePricesCCCINR = '';
  this.comparePricesCCCUSD = '';
   this.comparePricesCoinUSD = '';
  this.comparePricesKraUSD = '';
  this.comparePricesRemINR = '';
  }

  ngOnInit() {

      this.st.newTimer('10sec', 10);
      this.subscribeToTimer();
  }

  subscribeToTimer() {
    console.log('Subscribed to timer in Bitcoin');
    this.timerID = this.st.subscribe('10sec', () => {
      console.log('10 seconds has passed! Getting the new market prices');
      this.fetchingPricesUnoINR = 'Fetching new market price';
      this.fetchingPricesCCCINR = 'Fetching new market price';
      this.fetchingPricesCCCUSD = 'Fetching new market price';
      this.fetchingPricesCoinUSD = 'Fetching new market price';
      this.fetchingPricesKraUSD = 'Fetching new market price';
      this.fetchingPricesRemINR = 'Fetching new market price';
      this.fetchNewPrices();
    });
  }

  unsubscribeToTimer() {
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
    this.unsubscribeToTimer();
    this.router.navigate(['ethereum']);
  }

  goToRipple() {
    this.unsubscribeToTimer();
    this.router.navigate(['ripple']);
  }

  goToDashboard() {
    this.unsubscribeToTimer();
    this.router.navigate(['dashboard']);
  }

  fetchNewPrices() {
     this.bitcoinLivePrice.getUnocoinBitcoinLivePrice().subscribe (
     data => {
        this.fetchingPricesUnoINR = '';
        if (this.bitcoinUnocoinINR < data.INR) {
          this.comparePricesUnoINR = '[Unocoin prices went up by :' + ( data.INR - this.bitcoinUnocoinINR ) + ' INR]';
        } else if ( this.bitcoinUnocoinINR> data.INR) {
          this.comparePricesUnoINR = '[Unocoin prices down by :' + (this.bitcoinUnocoinINR  - data.INR) + ' INR]';
        } else {
          this.comparePricesUnoINR = '[No change in market prices]';
        }
        this.bitcoinUnocoinINR = data.INR;
      },
     error => console.log('An error occured while getting Uncoin prices')
    );







    this.bitcoinLivePrice.getCCCAGG_INR_BitcoinLivePrice().subscribe (
      data => {
         this.fetchingPricesCCCINR = '';

         if (this.bitcoinCCCAGGINR < data.INR) {
            // tslint:disable-next-line:max-line-length
            this.comparePricesCCCINR = '[Price Aggreate for Bitcoin in Indian Market went up by : ' + ( data.INR - this.bitcoinCCCAGGINR) + ' INR]';
         } else if ( this.bitcoinCCCAGGINR > data.INR ) {
           // tslint:disable-next-line:max-line-length
           this.comparePricesCCCINR = '[Price Aggreate for Bitcoin in Indian Market went down by : ' + (this.bitcoinCCCAGGINR - data.INR) + ' INR]';
         } else {
           this.comparePricesCCCINR = '[No change in market prices]';
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
           this.comparePricesCCCUSD = '[Price Aggreate for Bitocin in US Market went up by: ' + (data.USD - this.bitcoinCCCAGGUSD) + ' USD]';
         } else if (this.bitcoinCCCAGGUSD > data.USD) {
           // tslint:disable-next-line:max-line-length
           this.comparePricesCCCUSD = '[Price Aggreate for Bitocin in US Market went down by: ' + (this.bitcoinCCCAGGUSD - data.USD) + ' USD]';
         } else {
           this.comparePricesCCCUSD = '[No change in market prices]';
         }
         this.bitcoinCCCAGGUSD = data.USD; },
      error => console.log('An error occured while getting CCCAGG prices')
    );







    this.bitcoinLivePrice.getCoinbaseBitcoinLivePrice().subscribe (
      data => {
         this.fetchingPricesCoinUSD = '';
         if (this.bitcoinCoinbaseUSD < data.USD) {
           this.comparePricesCoinUSD = '[Coinbase price went up by: ' + (data.USD - this.bitcoinCoinbaseUSD) + ' USD]';
         } else if (this.bitcoinCoinbaseUSD > data.USD) {
           this.comparePricesCoinUSD = '[Coinbase price went down by: ' + (this.bitcoinCoinbaseUSD - data.USD) + ' USD]';
         } else {
           this.comparePricesCoinUSD = '[No change in market prices]';
         }
         this.bitcoinCoinbaseUSD = data.USD; } ,
      error => console.log('An error occured while getting Coinbase prices')
    );







    this.bitcoinLivePrice.getKrakenBitcoinLivePrice().subscribe (
      data => {
         this.fetchingPricesKraUSD = '';
         if (this.bitcoinKrakenUSD < data.USD) {
          this.comparePricesKraUSD = '[Kraken prices went up by: ' + (data.USD - this.bitcoinKrakenUSD) + ' USD]';
         } else if (this.bitcoinKrakenUSD > data.USD) {
           this.comparePricesKraUSD = '[Kraken prices went down by: ' + (this.bitcoinKrakenUSD - data.USD) + ' USD]';
         } else {
           this.comparePricesKraUSD = '[No change in market price]';
         }
         this.bitcoinKrakenUSD = data.USD;
        } ,
      error => console.log('An error occured while getting Kraken prices')
    );






    this.bitcoinLivePrice.getRemitanoBitcoinLivePrice().subscribe (
      data => {
         this.fetchingPricesRemINR = '';
         if (this.bitcoinRemitanoINR < data.INR) {
           this.comparePricesRemINR = '[Remitano prices went up by: ' + (data.INR - this.bitcoinRemitanoINR) + ' INR]';
         } else if (this.bitcoinRemitanoINR > data.INR) {
           this.comparePricesRemINR = '[Remitano prices went up by:' + (this.bitcoinRemitanoINR - data.INR) + ' INR]';
         } else {
           this.comparePricesRemINR = '[No change in market prices]';
         }
         this.bitcoinRemitanoINR = data.INR; } ,
      error => console.log('An error ocurred while getting Remitano prices')
    );
  }
}
