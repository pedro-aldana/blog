import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} from '../actions/register/types'

const initialState = {
    email: null, 
    first_name: null, 
    last_name: null, 
    password: null, 
    re_password: null, 
   
}

export default function Registro(state = initialState, action) {

    const {type,payload} = action


    switch (type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                email: payload,
                first_name: payload,
                last_name: payload,
                password: payload,
                re_password: payload,
                error: payload
            }
        
        case REGISTER_SUCCESS:
            return {
                ...state,
                email: payload,
                first_name: payload,
                last_name: payload,
                password: payload,
                re_password: payload,
                error: payload

            }
        case REGISTER_FAILURE:
            return {
                ...state,
                email: payload,
                first_name: payload,
                last_name: payload,
                password: payload,
                re_password: payload,
                error: payload
            }        
    
        default:
            return state
    }
}