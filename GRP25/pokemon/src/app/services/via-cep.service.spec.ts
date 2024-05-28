import { TestBed } from '@angular/core/testing';

import { ViaCEPService } from './via-cep.service';

describe('ViaCEPService', () => {
  let service: ViaCEPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViaCEPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
