import { TestBed, inject } from '@angular/core/testing';

import { RippleLivePriceService } from './ripple-live-price.service';

describe('RippleLivePriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RippleLivePriceService]
    });
  });

  it('should be created', inject([RippleLivePriceService], (service: RippleLivePriceService) => {
    expect(service).toBeTruthy();
  }));
});
