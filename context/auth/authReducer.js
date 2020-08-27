import { 
    REGISTER_SUCCESSFULLY, 
    REGISTER_ERROR,
    CLEAN_ALERT,
    USER_AUTHENTICATED 
} from '../../types';

export default (state, action) => {
    switch(action.type) {

        case REGISTER_SUCCESSFULLY:
        case REGISTER_ERROR:
            return {
                ...state,
                message: action.payload
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