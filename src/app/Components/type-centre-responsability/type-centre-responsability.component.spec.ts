import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCentreResponsabilityComponent } from './type-centre-responsability.component';

describe('TypeCentreResponsabilityComponent', () => {
  let component: TypeCentreResponsabilityComponent;
  let fixture: ComponentFixture<TypeCentreResponsabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeCentreResponsabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCentreResponsabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
