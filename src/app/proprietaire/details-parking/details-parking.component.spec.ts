import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsParkingComponent } from './details-parking.component';

describe('DetailsParkingComponent', () => {
  let component: DetailsParkingComponent;
  let fixture: ComponentFixture<DetailsParkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsParkingComponent]
    });
    fixture = TestBed.createComponent(DetailsParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
