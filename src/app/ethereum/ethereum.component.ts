import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { EthereumLivePriceService } from './ethereum-live-price.service';
@Component({
  selector: 'app-ethereum',
  templateUrl: './ethereum.component.html',
  styleUrls: ['./ethereum.component.css']
})
export class EthereumComponent implements OnInit {

  ethereumCoinbaseUSD: number;
  ethereumKrakenUSD: number;
  ethereumCCCAGGINR: number;
  ethereumCCCAGGUSD: number;
  ethereumEthexIndiaINR: number;
  ethereumRemitanoINR: number;

  constructor(private st: SimpleTimer, private ethereumLivePrice: EthereumLivePriceService) { }

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
    this.ethereumLivePrice.getCoinbaseEthereumLivePrice().subscribe (
      data => this.ethereumCoinbaseUSD = data.USD,
      error => console.log('An error occured while getting Coinbase prices')
    );

    this.ethereumLivePrice.getKrakenEthereumLivePrice().subscribe (
      data => this.ethereumKrakenUSD = data.USD,
      error => console.log('An error occured while getting Kraken prices')
    );

    this.ethereumLivePrice.getCCCAGG_INR_EthereumLivePrice().subscribe (
      data => this.ethereumCCCAGGINR = data.INR,
      error => console.log('An error occurred while getting CCCAGG INR prices')
    );

    this.ethereumLivePrice.getCCCAGG_USD_EthereumLivePrice().subscribe (
      data => this.ethereumCCCAGGUSD = data.USD,
      error => console.log('An error occurred while getting CCCAGG USD prices')
    );

    this.ethereumLivePrice.getEthexIndiaEthereumLivePrice().subscribe (
      data => this.ethereumEthexIndiaINR = data.INR,
      error => console.log('An error ocurred while getting EthexIndia prices')
    );

    this.ethereumLivePrice.getRemitanoEthereumLivePrice().subscribe (
      data => this.ethereumRemitanoINR = data.INR,
      error => console.log('An error ocurred while getting Remitano prices')
    );
  }
}
