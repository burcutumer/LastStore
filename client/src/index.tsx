import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import App from './app/layout/App';
import { store } from './app/store/configureStore';
import reportWebVitals from './reportWebVitals';

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <HistoryRouter history={history}>
      <Provider store={store}>
        <App />
      </Provider>
  </HistoryRouter>

);

reportWebVitals();