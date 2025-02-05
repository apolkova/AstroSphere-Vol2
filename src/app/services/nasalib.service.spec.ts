import { TestBed } from '@angular/core/testing';

import { NasalibService } from './nasalib.service';

describe('NasalibService', () => {
  let service: NasalibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NasalibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
