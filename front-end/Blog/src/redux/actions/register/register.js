import axios from 'axios'
import {REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE} from './types'

// Accion de registro de usuarios

export const registerUser = (formData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

        try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, formData);
        const responseData = response.data;
        dispatch({ type: REGISTER_SUCCESS, payload: responseData});
        } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.responseData });
        }

}