import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducers, productDetailsReducers } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userLogInReducers,
  userRegisterReducers,
  userDetailsReducers,
  userUpdateProfileReducers
} from './reducers/userReducer';

import {orderCreateReducer,orderDetailsReducer} from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,
  userLogin: userLogInReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducers,
  orderCreate: orderCreateReducer,
  orderDetails:orderDetailsReducer 
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

  const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

console.log(typeof cartItemsFromStorage);

const initialState = {
  cart: { cartItems: cartItemsFromStorage ,shippingAddress:shippingAddressFromStorage},
  userLogin: { userInfo: userInfoFromStorage },
};
console.log(initialState);

const middlerware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlerware))
);

export default store;
