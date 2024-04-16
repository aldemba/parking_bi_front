import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatVoituresComponent } from './etat-voitures.component';

describe('EtatVoituresComponent', () => {
  let component: EtatVoituresComponent;
  let fixture: ComponentFixture<EtatVoituresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatVoituresComponent]
    });
    fixture = TestBed.createComponent(EtatVoituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
