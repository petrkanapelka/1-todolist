import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './modules/store';
import App from 'app/App';
import { ErrorSnackbar } from 'components/ErrorSnackbar/ErrorSnackbar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
    <ErrorSnackbar/>
  </Provider>
);

