import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { EthereumLivePriceService } from './ethereum-live-price.service';
@Component({
  selector: 'app-ethereum',
  templateUrl: './ethereum.component.html',
  styleUrls: ['./ethereum.component.css']
})
export class EthereumComponent implements OnInit {

  ethereumKoniexINR: number;
  ethereumCoinbaseUSD: number;
  ethereumKrakenUSD: number;

  constructor(private st: SimpleTimer, private ethereumLivePrice: EthereumLivePriceService) { }

  ngOnInit() {

    this.st.newTimer('10sec', 10);
    this.st.newTimer('20sec', 20);
    this.subscribeToTimerOne();
    this.subscribeToTimerTwo();

  }

  subscribeToTimerOne() {
    this.st.subscribe('10sec', () => {
      console.log('10 seconds has passed! Getting the new market prices');
      this.fetchNewPrices();
    });
  }

  subscribeToTimerTwo() {
    this.st.subscribe('20sec', () => {
      console.log('20 seconds has passed! Getting the new market prices from Koinex');
      this.ethereumLivePrice.getKoinexEthereumLivePrice().subscribe (
        data => this.ethereumKoniexINR = data.prices.ETH,
        error => console.log('An error occured while getting Koniex prices')
      );
    });
  }

  fetchNewPrices() {
    this.ethereumLivePrice.getCoinbaseEthereumLivePrice().subscribe (
      data => this.ethereumCoinbaseUSD = data.USD,
      error => console.log('An error occured while getting Coinbase prices')
    );

    this.ethereumLivePrice.getKrakenEthereumLivePrice().subscribe (
      data => this.ethereumKrakenUSD = data.USD,
      error => console.log('An error occured while getting Kraken prices')
    );
  }
}
