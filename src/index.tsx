import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import AppWithReducer from './AppWithReducer';
import AppWithRedux from './AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './modules/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <AppWithReducer/> */}
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  </React.StrictMode>
);

