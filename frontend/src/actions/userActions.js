import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_USER_REQUEST,
  USER_LIST_USER_SUCCESS,
  USER_LIST_USER_FAIL,
  USER_LIST_USER_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from '../constants/userConstants';

import { ORDER_MY_LIST_RESET } from '../constants/orderConstant';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/users/login', { email, password }, config);
    // console.log(data)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response || err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({
    type: USER_LOGIN_LOGOUT,
  });
  dispatch({
    type: USER_DETAILS_RESET,
  });
  dispatch({
    type: ORDER_MY_LIST_RESET,
  });
  dispatch({
    type: USER_LIST_USER_RESET,
  });
  document.location.href = '/login'
};

//Register user

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/users', { name, email, password }, config);
    // console.log(data)

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: err.response || err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

//User details

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);
    // console.log(data)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: err.response || err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

//Update profile user

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);
    // console.log(data)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: err.response || err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_USER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/admin`, config);
    // console.log(data)

    dispatch({
      type: USER_LIST_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_LIST_USER_FAIL,
      payload: err.response || err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const deleteUsers = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/admin/${id}`, config);
    // console.log(data)

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: err.response || err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const updateUserAdmin = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/admin/${user._id}`, user, config)

    dispatch({ type: USER_UPDATE_SUCCESS })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

    dispatch({ type: USER_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    })
  }
};
