import { TestBed, inject } from '@angular/core/testing';

import { PromiseService } from './promise.service';

describe('PromiseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromiseService]
    });
  });

  it('should be created', inject([PromiseService], (service: PromiseService) => {
    expect(service).toBeTruthy();
  }));
});
