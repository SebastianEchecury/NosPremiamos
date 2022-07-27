import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import App from "./app/";
import "./scss/volt.scss";
import "react-datetime/css/react-datetime.css";
import { PersistGate } from "redux-persist/integration/react";

import ScrollToTop from "./components/ScrollToTop";
import { persistor, store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} >
      <Router>
        <ScrollToTop />
        <App />
      </Router>,
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);