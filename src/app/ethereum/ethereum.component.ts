import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { EthereumLivePriceService } from './ethereum-live-price.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



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

  timerID: string;

  name: string;
  photoURL: any;

  fetchingPricesCoinUSD: boolean;
  fetchingPricesKraUSD: boolean;
  fetchingPricesCCCINR: boolean;
  fetchingPricesCCCUSD: boolean;
  fetchingPricesEthexINR: boolean;
  fetchingPricesRemINR: boolean;

  constructor(private st: SimpleTimer,
    private ethereumLivePrice: EthereumLivePriceService,
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
    console.log('Subscribed to timer in Ethereum');
    this.st.subscribe('10sec', () => {
      console.log('10 seconds has passed! Getting the new market prices');
      this.fetchingPricesCoinUSD = true;
      this.fetchingPricesKraUSD = true;
      this.fetchingPricesCCCINR = true;
      this.fetchingPricesCCCUSD = true;
      this.fetchingPricesEthexINR = true;
      this.fetchingPricesRemINR = true;
      this.fetchNewPrices();
    });
  }

  unsubscribeToTimer() {
      this.fetchingPricesCoinUSD = false;
      this.fetchingPricesKraUSD = false;
      this.fetchingPricesCCCINR = false;
      this.fetchingPricesCCCUSD = false;
      this.fetchingPricesEthexINR = false;
      this.fetchingPricesRemINR = false;
    this.st.unsubscribe(this.timerID);
    this.st.delTimer('10sec');
    console.log('Unsubscribed to timer in Ethereum!');
  }

  goToBitcoin() {
    this.unsubscribeToTimer();
    this.router.navigate(['bitcoin']);
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
    this.ethereumLivePrice.getCoinbaseEthereumLivePrice().subscribe (
      data => { this.fetchingPricesCoinUSD = false; this.ethereumCoinbaseUSD = data.USD; } ,
      error => console.log('An error occured while getting Coinbase prices')
    );

    this.ethereumLivePrice.getKrakenEthereumLivePrice().subscribe (
      data => { this.fetchingPricesKraUSD = false; this.ethereumKrakenUSD = data.USD; } ,
      error => console.log('An error occured while getting Kraken prices')
    );

    this.ethereumLivePrice.getCCCAGG_INR_EthereumLivePrice().subscribe (
      data => { this.fetchingPricesCCCINR = false; this.ethereumCCCAGGINR = data.INR; } ,
      error => console.log('An error occurred while getting CCCAGG INR prices')
    );

    this.ethereumLivePrice.getCCCAGG_USD_EthereumLivePrice().subscribe (
      data => { this.fetchingPricesCCCUSD = false; this.ethereumCCCAGGUSD = data.USD; } ,
      error => console.log('An error occurred while getting CCCAGG USD prices')
    );

    this.ethereumLivePrice.getEthexIndiaEthereumLivePrice().subscribe (
      data => {  this.fetchingPricesEthexINR = false; this.ethereumEthexIndiaINR = data.INR; } ,
      error => console.log('An error ocurred while getting EthexIndia prices')
    );

    this.ethereumLivePrice.getRemitanoEthereumLivePrice().subscribe (
      data => { this.fetchingPricesRemINR = false; this.ethereumRemitanoINR = data.INR; } ,
      error => console.log('An error ocurred while getting Remitano prices')
    );
  }
}
