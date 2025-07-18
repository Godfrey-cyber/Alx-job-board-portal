import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
	job: [],
	isUploading: false,
	success: false,
	error: null,
};

// Slice
const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		jobStart: state => {
			state.error = false;
			isUploading = true;
			state.job = [], 
			success = false;
		},
		jobSuccess: (state, action) => {
			state.error = false;
			state.job = action.payload;
			isUploading = false;
			success = true;
		},
		jobFailure: (state, action) => {
			state.error = action.payload;
			state.isUploading = false;
			success = false;
		},
	},
});

export const { jobStart, jobSuccess, jobFailure } =
	jobSlice.actions;
export const selectJob = state => state.job.job;

export default jobSlice.reducer;
