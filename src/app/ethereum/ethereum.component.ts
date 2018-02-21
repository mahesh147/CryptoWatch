// This function is used to manage, update and display the Ethereum prices

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
// These variable are used to store the prices.
  ethereumCoinbaseUSD: number;
  ethereumKrakenUSD: number;
  ethereumCCCAGGINR: number;
  ethereumCCCAGGUSD: number;
  ethereumEthexIndiaINR: number;
  ethereumRemitanoINR: number;

  timerID: string; // TimerID is stored in this variable

  name: string;
  photoURL: any;

   // These variables are used to display whether a particular ethereum price is been fetched 
  fetchingPricesCoinUSD: string;
  fetchingPricesKraUSD: string;
  fetchingPricesCCCINR: string;
  fetchingPricesCCCUSD: string;
  fetchingPricesEthexINR: string;
  fetchingPricesRemINR: string;
//  These variables are used to store the status of the Ethereum
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
    // The 10 second timer is subscribed in this function.
    console.log('Subscribed to timer in Ethereum');
    this.st.subscribe('10sec', () => {
      console.log('10 seconds has passed! Getting the new market prices');
      this.fetchingPricesCoinUSD = 'Fetching data...';
      this.fetchingPricesKraUSD = 'Fetching data...';
      this.fetchingPricesCCCINR = 'Fetching data...';
      this.fetchingPricesCCCUSD = 'Fetching data...';
      this.fetchingPricesEthexINR = 'Fetching data...';
      this.fetchingPricesRemINR = 'Fetching data...';
      this.fetchNewPrices();
    });
  }

  unsubscribeToTimer() {
    // The timer is unsubscribed in this function.
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
  logout() {
 
    // This function is used to logout the user.
    this.unsubscribeToTimer();
    this.authService.logout()
    .then((res) => this.router.navigate(['/']));
  }
  goToBitcoin() {
    // navigates the user to the Bitcoin component
    this.unsubscribeToTimer();
    this.router.navigate(['bitcoin']);
  }

  goToRipple() {
    // navigates the user to the Ripple component
    this.unsubscribeToTimer();
    this.router.navigate(['ripple']);
  }

  goToDashboard() {
    // navigates the user back to dashboard
    this.unsubscribeToTimer();
    this.router.navigate(['dashboard']);
  }

  fetchNewPrices() {
    /* This function is used to fetch the new ethereum market price.
        After each price is fetched the previous prices are compared with the new ones.
        If there is any change in prices it is set to the comparePrices variable */
    
    this.ethereumLivePrice.getCoinbaseEthereumLivePrice().subscribe (
      data => {
        this.fetchingPricesCoinUSD = '';
        if (this.ethereumCoinbaseUSD < data.USD) {
          this.comparePricesCoinUSD = 'Prices went up by:' + (data.USD - this.ethereumCoinbaseUSD) + ' USD';
        } else if (this.ethereumCoinbaseUSD > data.USD) {
          this.comparePricesCoinUSD = 'Prices went down by:' + (this.ethereumCoinbaseUSD - data.USD) + ' USD';
        } else {
          this.comparePricesCoinUSD = 'No change';
        }
        this.ethereumCoinbaseUSD = data.USD; 
      } ,
      error => console.log('An error occured while getting Coinbase prices')
    );





    this.ethereumLivePrice.getKrakenEthereumLivePrice().subscribe (
      data => {
        this.fetchingPricesKraUSD = '';
        if (this.ethereumKrakenUSD < data.USD) {
          this.comparePricesKraUSD = 'Prices went up by:' + (data.USD - this.ethereumKrakenUSD) + ' USD';
        } else if (this.ethereumKrakenUSD > data.USD) {
          this.comparePricesKraUSD = 'Prices went down by:' + (this.ethereumKrakenUSD - data.USD) + ' USD';
        } else {
          this.comparePricesKraUSD = 'No change';
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
          this.comparePricesCCCINR = 'Price Aggreate went up by : ' + (data.INR - this.ethereumCCCAGGINR) + ' INR';
        } else if (this.ethereumCCCAGGINR >  data.INR) {
          // tslint:disable-next-line:max-line-length
          this.comparePricesCCCINR = 'Price Aggreate went down by : ' + (this.ethereumCCCAGGINR - data.INR) + ' INR';
        } else {
          this.comparePricesCCCINR = 'No change';
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
          this.comparePricesCCCUSD = 'Price Aggreate went up by : ' + (data.USD - this.ethereumCCCAGGUSD) + ' USD';
        } else if (this.ethereumCCCAGGUSD > data.USD) {
          // tslint:disable-next-line:max-line-length
          this.comparePricesCCCUSD = 'Price Aggreate went down by : ' + (this.ethereumCCCAGGUSD - data.USD) + ' USD';
        } else {
          this.comparePricesCCCUSD = 'No change';
        }
        this.ethereumCCCAGGUSD = data.USD;
       } ,
      error => console.log('An error occurred while getting CCCAGG USD prices')
    );





    this.ethereumLivePrice.getEthexIndiaEthereumLivePrice().subscribe (
      data => {  this.fetchingPricesEthexINR = '';
      if (this.ethereumEthexIndiaINR < data.INR) {
        this.comparePricesEthexINR = 'Prices went up by:' + (data.INR - this.ethereumEthexIndiaINR) + ' INR';
      } else if (this.ethereumEthexIndiaINR > data.INR) {
        this.comparePricesEthexINR = 'Prices went down by:' + (this.ethereumEthexIndiaINR - data.INR) + ' INR';
      } else {
        this.comparePricesEthexINR = 'No change';
      }
       this.ethereumEthexIndiaINR = data.INR; } ,
      error => console.log('An error ocurred while getting EthexIndia prices')
    );




    this.ethereumLivePrice.getRemitanoEthereumLivePrice().subscribe (
      data => { this.fetchingPricesRemINR = '';
      if (this.ethereumRemitanoINR < data.INR) {
        this.comparePricesRemINR = 'Prices went up by:' + (data.INR - this.ethereumRemitanoINR) + ' INR';
      } else if (this.ethereumRemitanoINR > data.INR) {
        this.comparePricesRemINR = 'Prices went down by:' + (this.ethereumRemitanoINR - data.INR) + ' INR';
      } else {
        this.comparePricesRemINR = 'No change';
            }
      this.ethereumRemitanoINR = data.INR; } ,
      error => console.log('An error ocurred while getting Remitano prices')
    );
  }
}
