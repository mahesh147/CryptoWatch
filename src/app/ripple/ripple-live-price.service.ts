import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class RippleLivePriceService {

  constructor(private _http: Http) { }

  getBTCXIndiaRippleLivePrice() {
    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=INR&e=BTCXIndia')
            .map(res => res.json());
  }

  getBitstampRippleLivePrice() {
    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=USD&e=Bitstamp')
            .map(res => res.json());
  }

  getCCCAGGRippleLivePriceINR() {
    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=INR&e=CCCAGG')
            .map(res => res.json());
  }


  getCCCAGGRippleLivePriceUSD() {
    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=USD&e=CCCAGG')
            .map(res => res.json());
  }


  getKrakenRippleLivePriceUSD() {
    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=USD&e=Kraken')
            .map(res => res.json());
  }
}
