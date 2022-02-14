import { createReducer, on } from '@ngrx/store';
import {
  addCar,
  addCarSuccess,
  getCars,
  getCarsSuccess,
} from '../actions/car.actions';
import { Car } from '../shared/models/car.model';

export interface CarState {
  cars: ReadonlyArray<Car>;
}

const initialState: ReadonlyArray<Car> = [];

export const carReducer = createReducer(
  initialState,
  on(getCarsSuccess, (state, { cars }) => [...cars]),
  on(addCarSuccess, (state, { cars }) => [...cars])
);
