import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store'
import './index.scss';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import AdminScreen from './screens/AdminScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <Router> */}
    {/* <Route path='' component={App} /> */}
    <App/>
    {/* <Route path='/admin' component={AdminScreen} /> */}
     {/* </Router> */}
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
