
import React, { createContext, useContext, useReducer } from 'react';

import { initialState, reducer } from './reducer';
import * as actions from './actions';

const ApiContext = createContext();

export const API = ({ url, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  const context = {
    url
  };

  const api = {};
  Object.keys(actions).forEach(k => {
    api[k] = async function() {
      const args = Array.from(arguments);
      const action = await actions[k].apply(null, args);
      await action(dispatch, state, context);
    };
  });

  return (
    <ApiContext.Provider value={{api, state}}>
      {children}
    </ApiContext.Provider>
  )
};

export const useAPI = () => useContext(ApiContext);
