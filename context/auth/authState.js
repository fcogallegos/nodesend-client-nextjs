import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';


import { 
    REGISTER_SUCCESSFULLY, 
    REGISTER_ERROR,
    HIDE_ALERT,
    LOGIN_ERROR,
    LOGIN_SUCCESSFULLY,
    AUTHENTICATED_USER,
    SIGN_OFF
} from '../../types';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {

    // define a initial state
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('rns-token'): '',
        authenticated: null,
        user: null,
        message: null
    }

    // define the reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // register new users
    const registerUser = async data => {
        
        try {
            const response = await clientAxios.post('/api/users', data);
            //console.log(response.data.msg);
            dispatch({
                type: REGISTER_SUCCESSFULLY,
                payload: response.data.msg
            })
        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: REGISTER_ERROR,
                payload: error.response.data.msg
            })
        }
        //clean the alert after 3 seconds
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    }

    //authenticate users
    const login = async data => {
        try {
            const response = await clientAxios.post('/api/auth', data);
            console.log(response.data.token);
            dispatch({
                type: LOGIN_SUCCESSFULLY,
                payload: response.data.token
            })
        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
        //clean the alert after 3 seconds
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    }

    // function that return the authenticated user in base to JWT
    const authenticatedUser = async () => {
        const token = localStorage.getItem('rns-token');
        if(token) {
            tokenAuth(token)
        }

        try {
            const response = await clientAxios.get('/api/auth');
            //console.log(response.data.user);
            dispatch({
                type: AUTHENTICATED_USER,
                payload: response.data.user
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    //function for sign off
    const signOff = () => {
        dispatch({
            type: SIGN_OFF
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                registerUser,
                login,
                authenticatedUser,
                signOff
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;