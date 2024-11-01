import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithRedux from './AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './modules/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>
);

