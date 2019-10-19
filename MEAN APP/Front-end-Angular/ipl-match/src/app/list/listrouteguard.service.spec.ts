import { TestBed } from '@angular/core/testing';

import { ListrouteguardService } from './listrouteguard.service';

describe('ListrouteguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListrouteguardService = TestBed.get(ListrouteguardService);
    expect(service).toBeTruthy();
  });
});
