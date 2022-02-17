import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { addCar } from '../actions/car.actions';
import { carRegistry } from '../actions/dropdown.actions';
import { Car } from '../shared/models/car.model';

@Component({
  selector: 'app-carr-registry-form',
  templateUrl: './carr-registry-form.component.html',
  styleUrls: ['./carr-registry-form.component.scss'],
})
export class CarrRegistryFormComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  form: FormGroup;

  types = [
    { value: 'CAR', viewValue: 'Car' },
    { value: 'TRUCK', viewValue: 'Truck' },
  ];
  colors = [
    { value: 'red', viewValue: 'Red' },
    { value: 'white', viewValue: 'White' },
    { value: 'blue', viewValue: 'Blue' },
  ];

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      vehicleType: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      licenceNumber: ['', Validators.required],
      ownerName: [''],
      capacity: [''],
    });
  }

  ngOnInit(): void {
    this.setValidatorRequired();
  }

  addCar(car: Car) {
    this.store.dispatch(addCar(car));
  }

  setValidatorRequired() {
    this.form
      ?.get('vehicleType')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((type: 'CAR' | 'TRUCK') => {
        if (type === 'TRUCK') {
          this.form.get('capacity')?.setValidators(Validators.required);
        } else {
          this.form.get('capacity')?.setValidators(null);
        }
        this.form.get('capacity')?.updateValueAndValidity();
        this.form.updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    const car: Car = this.form.value;
    this.addCar(car);
    Swal.fire('Good job!', 'Car has been saved!', 'success');

    this.store.dispatch(carRegistry());
  }
}
