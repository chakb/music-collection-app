import { createContext, useContext, useMemo, useReducer } from 'react';
import { Album, Artist } from '../../types';

import { Action, reducer } from './reducer';

export type State = {
  albums: Album[];
  artists: Artist[];
};

const initialState: State = {
  albums: [],
  artists: [],
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  children: React.ReactElement;
};

export function StateProvider({ children }: StateProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo<[State, React.Dispatch<Action>]>(() => {
    return [state, dispatch];
  }, [state, dispatch]);

  return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>;
}
export const useStateValue = () => useContext(StateContext);
