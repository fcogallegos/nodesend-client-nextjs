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
        original_name: '',
        loading: null,
        downloads: 1,
        password: '',
        author: null,
        url: ''
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
                    original_name: fileName
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

    //create a link when the file uploaded
    const createLink = async () => {
        //console.log('creating link...');
        const data = {
            name: state.name,
            original_name: state.original_name,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }
        
        try {
            const response = await clientAxios.post('/api/links', data);
            //console.log(response.data.msg);

            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: response.data.msg
            });
        } catch (error) {
            console.log(error);
        }   
    }

    return (
        <appContext.Provider
            value={{
                message_file: state.message_file,
                name: state.name,
                original_name: state.original_name,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                showAlert,
                uploadFile,
                createLink
            }}
        >
            {children}
        </appContext.Provider>
    )
 }

 export default AppState;