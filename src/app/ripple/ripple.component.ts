import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { RippleLivePriceService } from './ripple-live-price.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.css']
})
export class RippleComponent implements OnInit {

  rippleBTCXIndiaINR: number;
  rippleBitstampUSD: number;
  rippleCCCAGGINR: number;
  rippleCCCAGGUSD: number;
  rippleKrakenUSD: number;

  timerID: string;

  constructor(private st: SimpleTimer,
    private rippleLivePrice: RippleLivePriceService,
    private router: Router) { }

  ngOnInit() {
    this.st.newTimer('10sec', 10);
    this.subscribeToTimer();
  }

  subscribeToTimer() {
    console.log('Subscribed to Timer in Ripple');
    this.st.subscribe('10sec', () => {
      console.log('10 seconds has passed! Getting the new market prices');
      this.fetchNewPrices();
    });
  }

  unsubscribeToTimer() {
    this.st.unsubscribe(this.timerID);
    this.st.delTimer('10sec');
    console.log('Unsubscribed to timer in Ethereum!');
  }

  goToBitcoin() {
    this.unsubscribeToTimer();
    this.router.navigate(['bitcoin']);
  }

  goToEthereum() {
    this.unsubscribeToTimer();
    this.router.navigate(['ethereum']);
  }

  goToDashboard() {
    this.unsubscribeToTimer();
    this.router.navigate(['dashboard']);
  }
  fetchNewPrices() {
    this.rippleLivePrice.getBTCXIndiaRippleLivePrice().subscribe (
    data => this.rippleBTCXIndiaINR = data.INR,
    error => console.log('An error occured while getting BTCXIndia prices')
   );

   this.rippleLivePrice.getBitstampRippleLivePrice().subscribe (
     data => this.rippleBitstampUSD = data.USD,
     error => console.log('An error occured while getting Bitstamp prices')
   );

   this.rippleLivePrice.getCCCAGGRippleLivePriceINR().subscribe (
     data => this.rippleCCCAGGINR = data.INR,
     error => console.log('An error occured while getting CCCAGG prices')
   );


   this.rippleLivePrice.getCCCAGGRippleLivePriceUSD().subscribe (
    data => this.rippleCCCAGGUSD = data.USD,
    error => console.log('An error occured while getting CCCAGG prices')
  );

  this.rippleLivePrice.getKrakenRippleLivePriceUSD().subscribe (
    data => this.rippleKrakenUSD = data.USD,
    error => console.log('An error ocurred while getting Kraken prices')
  );
 }

}
