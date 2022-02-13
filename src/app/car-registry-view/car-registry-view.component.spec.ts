import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRegistryViewComponent } from './car-registry-view.component';

describe('CarRegistryViewComponent', () => {
  let component: CarRegistryViewComponent;
  let fixture: ComponentFixture<CarRegistryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarRegistryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRegistryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
