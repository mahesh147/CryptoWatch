import { TestBed, inject } from '@angular/core/testing';

import { EthereumLivePriceService } from './ethereum-live-price.service';

describe('EthereumLivePriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EthereumLivePriceService]
    });
  });

  it('should be created', inject([EthereumLivePriceService], (service: EthereumLivePriceService) => {
    expect(service).toBeTruthy();
  }));
});
