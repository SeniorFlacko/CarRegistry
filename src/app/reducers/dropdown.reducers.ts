import { Action, createReducer, on } from '@ngrx/store';
import { addCar, carRegistry } from '../actions/dropdown.actions';

export type Screens = 'CAR_REGISTRY' | 'ADD_CAR';

export const initialState: Screens = 'CAR_REGISTRY';

const _dropdownReducer = createReducer<Screens>(
  initialState,
  on(carRegistry, (state) => 'CAR_REGISTRY'),
  on(addCar, (state) => 'ADD_CAR')
);

export function dropdownReducer(state: Screens | undefined, action: Action) {
  return _dropdownReducer(state, action);
}
