import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './app';
import './index.css';

const initialState = {
  area: null
};

function reducer(state = initialState, action: any) {
  const { type } = action;

  switch (type) {
    case 'area':
      return {
        area: action.count
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
