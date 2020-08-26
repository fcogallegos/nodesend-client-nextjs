import { USER_AUTHENTICATED } from '../../types';

export default (state, action) => {
    switch(action.type) {

        case USER_AUTHENTICATED:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}