import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingUserComponent } from './parking-user.component';

describe('ParkingUserComponent', () => {
  let component: ParkingUserComponent;
  let fixture: ComponentFixture<ParkingUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingUserComponent]
    });
    fixture = TestBed.createComponent(ParkingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
