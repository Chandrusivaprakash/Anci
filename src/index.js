import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginSlice from './Redux/ReduxToolkit/LoginSlice';
import backendDataSlice from './Redux/ReduxToolkit/backendDataSlice';
import billingFormSlice from './Redux/ReduxToolkit/billingFormSlice';
import historyOfClient from './Redux/ReduxToolkit/historyOfClient';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authSlice from './Redux/ReduxToolkit/authSlice';
import FormToFB from './FormToFB';
import cartItemsSlice from './Redux/ReduxToolkit/cartItemsSlice';
import fetchDataCheck from './Redux/ReduxToolkit/fetchDataCheck';

const store = configureStore({
   reducer:{
    loginReducer:LoginSlice,
    auth:authSlice,
    backend:backendDataSlice,
    cartItem:cartItemsSlice,
    billingForm:billingFormSlice,
    clientHistory:historyOfClient,
    fetchDataCheck:fetchDataCheck
   }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
    {/* <FormToFB/> */}
  </React.StrictMode>
  </Provider>
);
