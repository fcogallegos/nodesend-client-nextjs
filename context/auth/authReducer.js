import { 
    REGISTER_SUCCESSFULLY, 
    REGISTER_ERROR,
    HIDE_ALERT,
    LOGIN_ERROR,
    LOGIN_SUCCESSFULLY,
    AUTHENTICATED_USER ,
    SIGN_OFF
} from '../../types';

export default (state, action) => {
    switch(action.type) {

        case REGISTER_SUCCESSFULLY:
        case REGISTER_ERROR:
        case LOGIN_ERROR:    
            return {
                ...state,
                message: action.payload
            }
        case LOGIN_SUCCESSFULLY:
            localStorage.setItem('rns-token', action.payload);
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
        case HIDE_ALERT:
            return {
                ...state,
                message: null
            }
        case AUTHENTICATED_USER:
            return {
                ...state,
                user: action.payload
            }
        case SIGN_OFF:
            localStorage.removeItem('rns-token');
            return {
                ...state,
                user: null,
                token: null,
                authenticated: null,

            }    
        default:
            return state;
    }
}