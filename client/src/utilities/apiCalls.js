import axios from 'axios';
import { loginStart, loginFailure, loginSuccess } from '../redux/authSlice.js';
import { axiosInstance } from './utilities.js';

export const loginUser = (email, password) => async dispatch => {
	dispatch(loginStart());
	try {
		const response = await axiosInstance.post('/auth/login-user', {
			email,
			password,
		});
		dispatch(loginSuccess(response.data));
	} catch (error) {
		dispatch(loginFailure(error.response.data.msg || error.message));
	}
};
