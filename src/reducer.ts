import type { Reducer } from 'react';
import { match } from 'ts-pattern';
import produce from 'immer';

interface State {
  time: number;
  direction: 'FORWARDS' | 'BACKWARDS';
}

type Actions = {
  type: 'TICK';
};

export const initialState: State = {
  time: 0,
  direction: 'FORWARDS',
};

const MaxTime = 200;

export const reducer: Reducer<State, Actions> = produce((state: State, action: Actions) => {
  return match(action)
    .with({ type: 'TICK' }, () => {
      const getDirection = (): State['direction'] => {
        if (state.direction === 'FORWARDS') {
          if (state.time >= MaxTime) {
            return 'BACKWARDS';
          }

          return 'FORWARDS';
        }

        if (state.direction === 'BACKWARDS') {
          if (state.time <= 0) {
            return 'FORWARDS';
          }

          return 'BACKWARDS';
        }

        throw new Error(`no direction for ${state.direction}`);
      };

      state.direction = getDirection();

      state.time = state.direction === 'FORWARDS' ? state.time + 1 : state.time - 1;
    })
    .otherwise(() => state);
});
