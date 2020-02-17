import { createReducer, on, createSelector } from '@ngrx/store';
import { increment, decrement, reset, setData } from './counter.actions';
import { start } from 'repl';

export const initialState = 0;

const _counterReducer = createReducer(
  initialState,
  on(increment, state => state + 1),
  on(decrement, state => state - 1),
  on(reset, state => 0),
  on(setData, (name, state) => {
    console.log(name, state, this)
    return name;
  })
);

export function counterReducer(state, action) {
  console.log(state, action)
  return _counterReducer(state, action);
}