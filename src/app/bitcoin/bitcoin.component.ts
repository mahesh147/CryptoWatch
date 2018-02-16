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

   fetchingPricesUnoINR: boolean;
   fetchingPricesCCCINR: boolean;
   fetchingPricesCCCUSD: boolean;
   fetchingPricesCoinUSD: boolean;
   fetchingPricesKraUSD: boolean;
   fetchingPricesRemINR: boolean;

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
  }

  ngOnInit() {

      this.st.newTimer('10sec', 10);
      this.subscribeToTimer();
  }

  subscribeToTimer() {
    console.log('Subscribed to timer in Bitcoin');
    this.timerID = this.st.subscribe('10sec', () => {
      console.log('10 seconds has passed! Getting the new market prices');
      this.fetchingPricesUnoINR = true;
      this.fetchingPricesCCCINR = true;
      this.fetchingPricesCCCUSD = true;
      this.fetchingPricesCoinUSD = true;
      this.fetchingPricesKraUSD = true;
      this.fetchingPricesRemINR = true;
      this.fetchNewPrices();
    });
  }

  unsubscribeToTimer() {
      this.fetchingPricesUnoINR = false;
      this.fetchingPricesCCCINR = false;
      this.fetchingPricesCCCUSD = false;
      this.fetchingPricesCoinUSD = false;
      this.fetchingPricesKraUSD = false;
      this.fetchingPricesRemINR = false;
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
     data => { this.fetchingPricesUnoINR = false; this.bitcoinUnocoinINR = data.INR; },
     error => console.log('An error occured while getting Uncoin prices')
    );

    this.bitcoinLivePrice.getCCCAGG_INR_BitcoinLivePrice().subscribe (
      data => { this.fetchingPricesCCCINR = false; this.bitcoinCCCAGGINR = data.INR; },
      error => console.log('An error occured while getting CCCAGG prices')
    );

    this.bitcoinLivePrice.getCCCAGG_USD_BitcoinLivePrice().subscribe (
      data => { this.fetchingPricesCCCUSD = false; this.bitcoinCCCAGGUSD = data.USD; },
      error => console.log('An error occured while getting CCCAGG prices')
    );

    this.bitcoinLivePrice.getCoinbaseBitcoinLivePrice().subscribe (
      data => { this.fetchingPricesCoinUSD = false; this.bitcoinCoinbaseUSD = data.USD; } ,
      error => console.log('An error occured while getting Coinbase prices')
    );

    this.bitcoinLivePrice.getKrakenBitcoinLivePrice().subscribe (
      data => { this.fetchingPricesKraUSD = false; this.bitcoinKrakenUSD = data.USD; } ,
      error => console.log('An error occured while getting Kraken prices')
    );

    this.bitcoinLivePrice.getRemitanoBitcoinLivePrice().subscribe (
      data => { this.fetchingPricesRemINR = false; this.bitcoinRemitanoINR = data.INR; } ,
      error => console.log('An error ocurred while getting Remitano prices')
    );
  }
}
