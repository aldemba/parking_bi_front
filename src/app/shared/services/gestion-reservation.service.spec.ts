import { TestBed } from '@angular/core/testing';

import { GestionReservationService } from './gestion-reservation.service';

describe('GestionReservationService', () => {
  let service: GestionReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
