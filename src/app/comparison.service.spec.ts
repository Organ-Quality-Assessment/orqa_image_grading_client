import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ComparisonService } from './comparison.service';

describe('ComparisonService', () => {
  let service: ComparisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ComparisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
