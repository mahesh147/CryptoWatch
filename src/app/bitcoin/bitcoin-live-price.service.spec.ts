import { TestBed, inject } from '@angular/core/testing';

import { BitcoinLivePriceService } from './bitcoin-live-price.service';

describe('BitcoinLivePriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BitcoinLivePriceService]
    });
  });

  it('should be created', inject([BitcoinLivePriceService], (service: BitcoinLivePriceService) => {
    expect(service).toBeTruthy();
  }));
});
