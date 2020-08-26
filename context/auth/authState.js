import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { USER_AUTHENTICATED } from '../../types';

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
                userAuthenticated
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;