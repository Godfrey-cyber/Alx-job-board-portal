import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import jobReducer from './authSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		job: jobReducer,
	},
});