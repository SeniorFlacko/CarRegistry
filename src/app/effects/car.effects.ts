import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmptyError } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import {
  addCar,
  addCarSuccess,
  getCars,
  getCarsSuccess,
} from '../actions/car.actions';
import { DataService } from '../services/data.service';

@Injectable()
export class CarEffect {
  loadCar$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCars),
      exhaustMap(({ basic }) => {
        return this.dataService.getCars(basic).pipe(
          map((cars) => getCarsSuccess({ cars }))
          // catchError(() => console.error)
        );
      })
    )
  );

  addCar$ = createEffect(() =>
    this.action$.pipe(
      ofType(addCar),
      exhaustMap((newCar) =>
        this.dataService.addCar(newCar).pipe(
          map((cars) => addCarSuccess({ cars }))
          // catchError(() => console.error)
        )
      )
    )
  );
  constructor(private action$: Actions, private dataService: DataService) {}
}
