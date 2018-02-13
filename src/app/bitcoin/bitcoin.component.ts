import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { BitcoinLivePriceService } from './bitcoin-live-price.service';
import { Router } from '@angular/router';


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

  constructor(
    private st: SimpleTimer,
    private bitcoinLivePrice: BitcoinLivePriceService,
    private router: Router
  ) {}

  ngOnInit() {
      this.st.newTimer('10sec', 10);
      this.subscribeToTimer();
  }

  subscribeToTimer() {
    console.log('Subscribed to timer in Bitcoin');
    this.timerID = this.st.subscribe('10sec', () => {
      console.log('10 seconds has passed! Getting the new market prices');
      this.fetchNewPrices();
    });
  }

  unsubscribeToTimer() {
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
     data => this.bitcoinUnocoinINR = data.INR,
     error => console.log('An error occured while getting Uncoin prices')
    );

    this.bitcoinLivePrice.getCCCAGG_INR_BitcoinLivePrice().subscribe (
      data => this.bitcoinCCCAGGINR = data.INR,
      error => console.log('An error occured while getting CCCAGG prices')
    );

    this.bitcoinLivePrice.getCCCAGG_USD_BitcoinLivePrice().subscribe (
      data => this.bitcoinCCCAGGUSD = data.USD,
      error => console.log('An error occured while getting CCCAGG prices')
    );

    this.bitcoinLivePrice.getCoinbaseBitcoinLivePrice().subscribe (
      data => this.bitcoinCoinbaseUSD = data.USD,
      error => console.log('An error occured while getting Coinbase prices')
    );

    this.bitcoinLivePrice.getKrakenBitcoinLivePrice().subscribe (
      data => this.bitcoinKrakenUSD = data.USD,
      error => console.log('An error occured while getting Kraken prices')
    );

    this.bitcoinLivePrice.getRemitanoBitcoinLivePrice().subscribe (
      data => this.bitcoinRemitanoINR = data.INR,
      error => console.log('An error ocurred while getting Remitano prices')
    );
  }
}
