import { REGISTER_SUCCESSFULLY, USER_AUTHENTICATED } from '../../types';

export default (state, action) => {
    switch(action.type) {

        case REGISTER_SUCCESSFULLY:
            return {
                ...state,
                message: action.payload
            }

        default:
            return state;
    }
}