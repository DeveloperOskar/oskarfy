import React, { createContext, useReducer, useContext } from 'react';

export const StateProvider = createContext();

export const ContextProvider = ({ initialState, reducer, children }) => (
  <StateProvider.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateProvider.Provider>
);

export const useStateProvidervalue = () => useContext(StateProvider);
