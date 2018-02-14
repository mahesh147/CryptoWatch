import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class EthereumLivePriceService {

  constructor(private _http: Http) { }

  getKoinexEthereumLivePrice() {

    return this._http.get('https://koinex.in/api/ticker')
           .map(res => res.json());
  }

  getCoinbaseEthereumLivePrice() {

    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&e=Coinbase')
          .map(res => res.json());
  }

  getKrakenEthereumLivePrice() {

    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&e=Kraken')
          .map(res => res.json());
  }

 }
