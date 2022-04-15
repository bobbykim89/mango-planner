import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import authReducer from './authReducer'
import setAuthToken from 'utils/setAuthToken'
import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from '../types'

export const AuthContext = createContext()

const AuthState = (props) => {
  const initialState = {
    token: Cookies.get('token') || null,
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  }

  const authToken = Cookies.get('token')

  useEffect(() => {
    if (authToken !== null) {
      setAuthToken(authToken)
      loadUser()
    } else {
      initialState.loading = false
    }

    // eslint-disable-next-line
  }, [authToken])

  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load User
  const loadUser = async () => {
    // Load token into global headers
    try {
      const res = await axios.get('/api/auth')
      dispatch({ type: USER_LOADED, payload: res.data })
    } catch (err) {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.post('/api/users', formData, config)

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
      loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      })
      Cookies.remove('token')
    }
  }

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.post('/api/auth', formData, config)

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
      loadUser()
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      })
      Cookies.remove('token')
    }
  }

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT })
    Cookies.remove('token')
  }

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
