import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      licenceNumber: ['', Validators.required],
      owner: [''],
      capacity: [''],
    });
  }

  ngOnInit(): void {
    this.setValidatorRequired();
  }

  setValidatorRequired() {
    this.form
      ?.get('type')
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
}
