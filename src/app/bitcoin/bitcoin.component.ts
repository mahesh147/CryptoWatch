import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { BitcoinLivePriceService } from './bitcoin-live-price.service';


@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.component.html',
  styleUrls: ['./bitcoin.component.css']
})
export class BitcoinComponent implements OnInit {


   bitcoinUnocoinINR: number;
   bitcoinCCCAGGINR: number;
   bitcoinCoinbaseUSD: number;
   bitcoinKrakenUSD: number;

  constructor(
    private st: SimpleTimer,
    private bitcoinLivePrice: BitcoinLivePriceService,
  ) {}

  ngOnInit() {
      this.st.newTimer('10sec', 10);
      this.subscribeToTimer();
  }

  subscribeToTimer() {
    this.st.subscribe('10sec', () => {
      console.log('10 seconds has passed! Getting the new market prices');
      this.fetchNewPrices();
    });
  }

  fetchNewPrices() {
     this.bitcoinLivePrice.getUnocoinBitcoinLivePrice().subscribe (
     data => this.bitcoinUnocoinINR = data.INR,
     error => console.log('An error occured while getting Uncoin prices')
    );

    this.bitcoinLivePrice.getCCCAGGBitcoinLivePrice().subscribe (
      data => this.bitcoinCCCAGGINR = data.INR,
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
  }
}
