import { TestBed } from '@angular/core/testing';

import { CartCurrencyService } from './cart-currency.service';

describe('CartCurrencyService', () => {
  let service: CartCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
