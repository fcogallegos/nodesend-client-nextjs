import { 
    REGISTER_SUCCESSFULLY, 
    REGISTER_ERROR,
    CLEAN_ALERT,
    USER_AUTHENTICATED,
    LOGIN_ERROR,
    LOGIN_SUCCESSFULLY 
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
        case CLEAN_ALERT:
            return {
                ...state,
                message: null
            }
        
        default:
            return state;
    }
}