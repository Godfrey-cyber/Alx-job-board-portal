import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
	user: null,
	accessToken: null,
	isAuthenticated: false,
	loading: false,
	error: null,
};

// Slice
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart: state => {
			state.loading = true;
			isAuthenticated: false;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			const { user, accessToken } = action.payload;
			state.user = user;
			state.accessToken = accessToken;
			isAuthenticated: true;
		},
		loginFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			isAuthenticated: false;
		},
		signUpStart: state => {
			state.loading = true;
		},
		signUpSuccess: (state, action) => {
			state.loading = false;
			state.user = action.payload;
		},
		signUpFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		logout: state => {
			state.user = null;
			state.accessToken = null;
			state.error = null;
			isAuthenticated: false;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	signUpStart,
	signUpSuccess,
	signUpFailure,
	logout,
} = authSlice.actions;
export const selectCurrentUser = state => state.auth.user;
export const selectAccessToken = state => state.auth.accessToken;
export const selectIsAunthenticated = state => state.auth.isAuthenticated;

export default authSlice.reducer;
