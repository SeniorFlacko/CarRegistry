import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrRegistryFormComponent } from './carr-registry-form.component';

describe('CarrRegistryFormComponent', () => {
  let component: CarrRegistryFormComponent;
  let fixture: ComponentFixture<CarrRegistryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrRegistryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrRegistryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
