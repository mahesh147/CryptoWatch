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

  fetchingPricesCoinUSD: string;
  fetchingPricesKraUSD: string;
  fetchingPricesCCCINR: string;
  fetchingPricesCCCUSD: string;
  fetchingPricesEthexINR: string;
  fetchingPricesRemINR: string;

  comparePricesCoinUSD: string;
  comparePricesKraUSD: string;
  comparePricesCCCINR: string;
  comparePricesCCCUSD: string;
  comparePricesEthexINR: string;
  comparePricesRemINR: string;


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
      this.fetchingPricesCoinUSD = 'Fetching new market price';
      this.fetchingPricesKraUSD = 'Fetching new market price';
      this.fetchingPricesCCCINR = 'Fetching new market price';
      this.fetchingPricesCCCUSD = 'Fetching new market price';
      this.fetchingPricesEthexINR = 'Fetching new market price';
      this.fetchingPricesRemINR = 'Fetching new market price';
      this.fetchNewPrices();
    });
  }

  unsubscribeToTimer() {
      this.fetchingPricesCoinUSD = '';
      this.fetchingPricesKraUSD = '';
      this.fetchingPricesCCCINR = '';
      this.fetchingPricesCCCUSD = '';
      this.fetchingPricesEthexINR = '';
      this.fetchingPricesRemINR = '';
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
      data => {
        this.fetchingPricesCoinUSD = '';
        if (this.ethereumCoinbaseUSD < data.USD) {
          this.comparePricesCoinUSD = '[Coinbase prices went up by :' + (data.USD - this.ethereumCoinbaseUSD) + ' USD]';
        } else if (this.ethereumCoinbaseUSD > data.USD) {
          this.comparePricesCoinUSD = '[Coinbase prices went down by :' + (this.ethereumCoinbaseUSD - data.USD) + ' USD]';
        } else {
          this.comparePricesCoinUSD = '[No change in market prices]';
        }
        this.ethereumCoinbaseUSD = data.USD; 
      } ,
      error => console.log('An error occured while getting Coinbase prices')
    );





    this.ethereumLivePrice.getKrakenEthereumLivePrice().subscribe (
      data => {
        this.fetchingPricesKraUSD = '';
        if (this.ethereumKrakenUSD < data.USD) {
          this.comparePricesKraUSD = '[Kraken prices went up by :' + (data.USD - this.ethereumKrakenUSD) + ' USD]';
        } else if (this.ethereumKrakenUSD > data.USD) {
          this.comparePricesKraUSD = '[Kraken prices went down by :' + (this.ethereumKrakenUSD - data.USD) + ' USD]';
        } else {
          this.comparePricesKraUSD = '[No change in market prices]';
        }
        this.ethereumKrakenUSD = data.USD; 
      } ,
      error => console.log('An error occured while getting Kraken prices')
    );





    this.ethereumLivePrice.getCCCAGG_INR_EthereumLivePrice().subscribe (
      data => {
        this.fetchingPricesCCCINR = '';
        if (this.ethereumCCCAGGINR < data.INR) {
          // tslint:disable-next-line:max-line-length
          this.comparePricesCCCINR = '[Price Aggreate for Ethereum in Indian Market went up by :' + (data.INR - this.ethereumCCCAGGINR) + ' INR]';
        } else if (this.ethereumCCCAGGINR >  data.INR) {
          // tslint:disable-next-line:max-line-length
          this.comparePricesCCCINR = '[Price Aggreate for Ethereum in Indian Market went down by :' + (this.ethereumCCCAGGINR - data.INR) + ' INR';
        } else {
          this.comparePricesCCCINR = '[No change in market prices]';
        }
        this.ethereumCCCAGGINR = data.INR; 
      } ,
      error => console.log('An error occurred while getting CCCAGG INR prices')
    );






    this.ethereumLivePrice.getCCCAGG_USD_EthereumLivePrice().subscribe (
      data => {
        this.fetchingPricesCCCUSD = '';
        if (this.ethereumCCCAGGUSD < data.USD) {
          // tslint:disable-next-line:max-line-length
          this.comparePricesCCCUSD = '[Price Aggreate for Ethereum in US Market went up by :' + (data.USD - this.ethereumCCCAGGUSD) + ' USD]';
        } else if (this.ethereumCCCAGGUSD > data.USD) {
          // tslint:disable-next-line:max-line-length
          this.comparePricesCCCUSD = '[Price Aggreate for Ethereum in US Market went down by :' + (this.ethereumCCCAGGUSD - data.USD) + ' USD]';
        } else {
          this.comparePricesCCCUSD = '[No change in market prices]';
        }
        this.ethereumCCCAGGUSD = data.USD;
       } ,
      error => console.log('An error occurred while getting CCCAGG USD prices')
    );





    this.ethereumLivePrice.getEthexIndiaEthereumLivePrice().subscribe (
      data => {  this.fetchingPricesEthexINR = '';
      if (this.ethereumEthexIndiaINR < data.INR) {
        this.comparePricesEthexINR = '[EthexIndia prices went up by :' + (data.INR - this.ethereumEthexIndiaINR) + ' INR]';
      } else if (this.ethereumEthexIndiaINR > data.INR) {
        this.comparePricesEthexINR = '[EthexIndia prices went down by:' + (this.ethereumEthexIndiaINR - data.INR) + ' INR]';
      } else {
        this.comparePricesEthexINR = '[No change in market prices]';
      }
       this.ethereumEthexIndiaINR = data.INR; } ,
      error => console.log('An error ocurred while getting EthexIndia prices')
    );




    this.ethereumLivePrice.getRemitanoEthereumLivePrice().subscribe (
      data => { this.fetchingPricesRemINR = '';
      if (this.ethereumRemitanoINR < data.INR) {
        this.comparePricesRemINR = '[Remitano prices went by :' + (data.INR - this.ethereumRemitanoINR) + ' INR]';
      } else if (this.ethereumRemitanoINR > data.INR) {
        this.comparePricesRemINR = '[Remitano prices went down by:' + (this.ethereumRemitanoINR - data.INR) + ' INR]';
      } else {
        this.comparePricesRemINR = '[No change in market prices]';
            }
      this.ethereumRemitanoINR = data.INR; } ,
      error => console.log('An error ocurred while getting Remitano prices')
    );
  }
}
