import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesParkingsComponent } from './mes-parkings.component';

describe('MesParkingsComponent', () => {
  let component: MesParkingsComponent;
  let fixture: ComponentFixture<MesParkingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesParkingsComponent]
    });
    fixture = TestBed.createComponent(MesParkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
