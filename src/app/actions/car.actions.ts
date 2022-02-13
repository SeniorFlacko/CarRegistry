import { createAction, props } from '@ngrx/store';
import { Car } from '../shared/models/car.model';

export const getCars = createAction(
  '[Car] Get Cars',
  props<{ basic: boolean }>()
);

export const getCarsSuccess = createAction(
  '[Car] Get Cars Success',
  // (cars: ReadonlyArray<Car>) => cars
  props<{ cars: ReadonlyArray<Car> }>()
);

export const addCar = createAction(
  '[Car] Add Car',
  (car: Car) => car
  // props<{ car: Car }>()
);
export const addCarSuccess = createAction(
  '[Car] Add Car Success',
  props<{ cars: ReadonlyArray<Car> }>()
);
