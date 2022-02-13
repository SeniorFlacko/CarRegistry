import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { addCar, carRegistry } from '../actions/dropdown.actions';
import { Screens } from '../reducers/dropdown.reducers';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss'],
})
export class RegistryComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  dropdown$: Observable<Screens>;
  form: FormGroup;
  screens = [
    { value: 'CAR_REGISTRY', viewValue: 'Car Registry' },
    { value: 'ADD_CAR', viewValue: 'Add Car' },
  ];

  screenControl = new FormControl(this.screens[0].value);

  constructor(private store: Store<{ dropdown: Screens }>) {
    this.dropdown$ = store.select('dropdown');
    this.form = new FormGroup({
      screen: this.screenControl,
    });
  }

  ngOnInit(): void {
    this.subscribeToDropdownChanges();
  }

  showCarRegistryView() {
    this.store.dispatch(carRegistry());
  }

  showAddCarView() {
    this.store.dispatch(addCar());
  }

  subscribeToDropdownChanges() {
    this.form
      .get('screen')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((screenSelected: Screens) => {
        if (screenSelected === 'CAR_REGISTRY') {
          this.showCarRegistryView();
        } else {
          this.showAddCarView();
        }
      });
  }

  setDropdownInitialValue() {
    this.dropdown$
      .pipe(takeUntil(this.destroy$))
      .subscribe((initialScreenSelected: Screens) => {
        if (initialScreenSelected === 'CAR_REGISTRY') {
          this.form.get('screen')?.setValue('CAR_REGISTRY');
        } else {
          this.form.get('screen')?.setValue('ADD_CAR');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
