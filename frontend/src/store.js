import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducers,
  productDetailsReducers,
  productDeleteReducers,
  productCreateReducers,
  productUpdateReducers,
  productTopRatedReducers
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userLogInReducers,
  userRegisterReducers,
  userDetailsReducers,
  userUpdateProfileReducers,
  userListReducers,
  userDeleteReducers,
  userUpdateReducer,
} from './reducers/userReducer';

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMyListReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  productDelete: productDeleteReducers,
  productCreate: productCreateReducers,
  productUpdateAdmin: productUpdateReducers,
  productTopRated:productTopRatedReducers,
  cart: cartReducer,
  userLogin: userLogInReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducers,
  userList: userListReducers,
  userUpdate: userUpdateReducer,
  deleteUser: userDeleteReducers,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMyListPro: orderMyListReducer,

  // test:orderListMyReducer,
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
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};
// console.log(initialState);

const middlerware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlerware))
);

export default store;
