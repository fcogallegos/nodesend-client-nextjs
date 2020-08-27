import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { 
    REGISTER_SUCCESSFULLY, 
    REGISTER_ERROR,
    CLEAN_ALERT,
    LOGIN_ERROR
} from '../../types';

import clientAxios from '../../config/axios';

const AuthState = ({children}) => {

    // define a initial state
    const initialState = {
        token: '',
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
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    //authenticate users
    const login = async data => {
        try {
            const response = await clientAxios.post('/api/auth', data);
            console.log(response);
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
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    //user authenticated
    const userAuthenticated = name => {
        dispatch({
            type: USER_AUTHENTICATED,
            payload: name
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
                userAuthenticated,
                login
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;