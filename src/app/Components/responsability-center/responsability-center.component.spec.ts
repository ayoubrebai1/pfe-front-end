import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsabilityCenterComponent } from './responsability-center.component';

describe('ResponsabilityCenterComponent', () => {
  let component: ResponsabilityCenterComponent;
  let fixture: ComponentFixture<ResponsabilityCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsabilityCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsabilityCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
