// This services used Angular 5's http library to perform API calls to 3rd party websites

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class EthereumLivePriceService {

  constructor(private _http: Http) { }

  getEthexIndiaEthereumLivePrice() {

      return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR&e=EthexIndia')
             .map(res => res.json());
  }

  getRemitanoEthereumLivePrice() {

      return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR&e=Remitano')
             .map(res => res.json());
    }

  getCCCAGG_INR_EthereumLivePrice() {

    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR&e=CCCAGG')
           .map(res => res.json());
  }

  getCCCAGG_USD_EthereumLivePrice() {

    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&e=CCCAGG')
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
