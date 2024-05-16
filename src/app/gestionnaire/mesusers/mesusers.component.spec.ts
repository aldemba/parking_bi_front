import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesusersComponent } from './mesusers.component';

describe('MesusersComponent', () => {
  let component: MesusersComponent;
  let fixture: ComponentFixture<MesusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesusersComponent]
    });
    fixture = TestBed.createComponent(MesusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
