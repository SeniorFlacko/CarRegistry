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

const getBasicViewData = (): Car[] => {
  return [
    {
      vehicleType: 'CAR',
      model: 'MAZDA CX-5',
      color: 'red',
      licenceNumber: '7979DASA',
    },
    {
      vehicleType: 'TRUCK',
      model: 'VOLVO AGT-M',
      color: 'white',
      licenceNumber: 'DAJHDA889',
    },
  ];
};

const getExtendedViewData = (): Car[] => {
  return [
    {
      vehicleType: 'CAR',
      model: 'MAZDA CX-5',
      color: 'red',
      licenceNumber: '7979DASA',
      ownerName: 'John Doe',
      capacity: 'n/a',
    },
    {
      vehicleType: 'TRUCK',
      model: 'VOLVO AGT-M',
      color: 'white',
      licenceNumber: 'DAJHDA889',
      ownerName: 'Peter Jo',
      capacity: '1500lbs',
    },
  ];
};
