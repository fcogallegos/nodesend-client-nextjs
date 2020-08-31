import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';

import { 
    SHOW_ALERT,
    HIDE_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR
 } from '../../types';
 import clientAxios from '../../config/axios';

 const AppState = ({children}) => {

    const initialState = {
        message_file: null,
        name: '',
        name_original: '',
        loading: null
    }

    //create dispatch and state
    const [state, dispatch] = useReducer(appReducer, initialState);

    //show an alert
    const showAlert = msg => {
        console.log(msg);
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        });
        
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    }

    //files upload to server
    const uploadFile = async (formData, fileName) => {
        
        dispatch({
            type: UPLOAD_FILE
        })

        try {
            const response = await clientAxios.post('/api/files', formData);
            console.log(response.data);
 
            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: {
                    name: response.data.file,
                    name_original: fileName
                }     
            })

        } catch (error) {
            console.log(error);
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: error.response.data.msg
            })
        }
    } 

    return (
        <appContext.Provider
            value={{
                message_file: state.message_file,
                name: state.name,
                name_original: state.name_original,
                loading: state.loading,
                showAlert,
                uploadFile
            }}
        >
            {children}
        </appContext.Provider>
    )
 }

 export default AppState;