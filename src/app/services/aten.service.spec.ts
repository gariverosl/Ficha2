import { TestBed } from '@angular/core/testing';

import { AtenService } from './aten.service';

describe('AtenService', () => {
  let service: AtenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
