import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from './redux/authSlice.js';
import { axiosInstance } from './utilities/utilities.js';

// Components & Pages
import LandingPage from './pages/LandingPage.jsx';
import Application from './pages/Application.jsx';
import Login from './pages/Login.jsx';
import Header from './components/Header.jsx';
import Jobs from './pages/Jobs.jsx';
import PostAJob from './pages/PostAJob.jsx';
import CompaniesHiring from './pages/CompaniesHiring.jsx'
import Signup from './pages/Signup.jsx'
import Job from './pages/Job.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import SearchJobs from './pages/SearchJobs.jsx'
import './App.css'

function App() {
    const dispatch = useDispatch();
    const { user, loading, error, accessToken, isAuthenticated } = useSelector(
        state => state.auth
    );

    useEffect(() => {
        // On initial load, check if the user is authenticated
        const refreshToken = async () => {
            try {
                const response = await axiosInstance.get('/auth/refresh'); // Endpoint to fetch the logged-in user
                dispatch(loginSuccess(response.data)); // Dispatch user data to Redux store
            } catch (error) {
                console.log('User not authenticated', error);
            }
        };
        refreshToken();
    }, [dispatch, isAuthenticated]);

    console.log(user);
    return (
        <section className="min-h-screen font-['Montserrat'] scroll-smooth w-full overflow-x-hidden relative">
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/account/login" element={<Login />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/user/post-a-job" element={accessToken ? <PostAJob /> : <LandingPage />} />
                    <Route path="/job/:id" element={<Job />} />
                    <Route path="/companies-hiring" element={<CompaniesHiring />} />
                    <Route path="/jobs/search" element={<SearchJobs />} />
                    <Route path="/account/signup" element={<Signup />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route
                        path="/application"
                        element={
                            accessToken ? <Application /> : <LandingPage />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </section>
    )
}

export default App
