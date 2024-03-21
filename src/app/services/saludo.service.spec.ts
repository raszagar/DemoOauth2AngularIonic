import { TestBed } from '@angular/core/testing';

import { SaludoService } from './saludo.service';

describe('SaludoService', () => {
  let service: SaludoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaludoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
