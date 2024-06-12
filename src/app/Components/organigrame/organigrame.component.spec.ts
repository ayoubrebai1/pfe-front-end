import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganigrameComponent } from './organigrame.component';

describe('OrganigrameComponent', () => {
  let component: OrganigrameComponent;
  let fixture: ComponentFixture<OrganigrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganigrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganigrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
