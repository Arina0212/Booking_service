import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import browserHistory from './browser-history';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import HistoryRouter from './services/history-route/history-route';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={browserHistory}>
                <App />
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
