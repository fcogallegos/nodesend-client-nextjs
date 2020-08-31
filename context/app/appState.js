import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';

import { 
    SHOW_ALERT,
    CLEAN_ALERT,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR
 } from '../../types';

 const AppState = ({children}) => {

    const initialState = {
        message_file: '',
    }

    //create dispatch and state
    const [state, dispatch] = useReducer(appReducer, initialState);

    //show an alert
    const showAlert = msg => {
        console.log(msg);
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        })
    }

    return (
        <appContext.Provider
            value={{
                message_file: state.message_file,
                showAlert
            }}
        >
            {children}
        </appContext.Provider>
    )
 }

 export default AppState;