import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class BitcoinLivePriceService {

  constructor(private _http: Http) { }

  getUnocoinBitcoinLivePrice() {

  return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=INR&e=Unocoin')
            .map(res => res.json());

  }

  getCCCAGGBitcoinLivePrice() {

    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=INR&e=CCCAGG')
            .map(res => res.json());
  }

  getCoinbaseBitcoinLivePrice() {

    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&e=Coinbase')
            .map(res => res.json());
  }

  getKrakenBitcoinLivePrice() {

  return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&e=Kraken')
          .map(res => res.json());
  }
}

