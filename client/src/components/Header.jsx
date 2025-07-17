import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../utilities/utilities.js';
import { useDispatch } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";

import UserModal from "./UserModal.jsx"

const Header = ({ setIsModalOpen2 }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.auth);
	
	return (
		<div className="flex items-center justify-between w-full bg-white h-20 border-b border-gray-300 px-5 md:px-10 lg:px-20">
			<p onClick={() => navigate("/")} className="text-lg lg:text-4xl text-amber-700 font-semibold cursor-pointer">Lancer</p>
			<div className="flex items-center space-x-4 divide-x divide-gray-400">
				{!accessToken && <span className="flex items-center space-x-3 divide-x divide-gray-400">
					<p onClick={() => navigate('/account/login')} className="font-semibold text-sm px-4 py-2 hover:text-amber-700 transition-all delay-300 cursor-pointer text-red-600">Log In</p>
					<p onClick={() => navigate('/account/signup')} className="font-semibold text-sm px-4 py-2 hover:text-amber-700 transition-all delay-300 cursor-pointer text-red-600">Sign Up</p>
				</span>}
				{!accessToken ? (<button onClick={() => navigate("/post-a-job")} className="font-semibold text-sm rounded-sm text-white px-4 py-2 hover:bg-red-600 hover:text-white transition-all delay-300 cursor-pointer text-white bg-red-700 ">Post A Job</button>) : (<button onClick={() => navigate("/find-a-job")} className="font-semibold text-sm rounded-sm text-amber-800 px-4 py-2 hover:bg-red-100 hover:text-amber-800 transition-all delay-300 cursor-pointer bg-white border border-amber-600">Find A Job</button>)}
				{accessToken && <FaRegUserCircle onClick={() => setIsModalOpen2(true)} className="h-9 w-9 text-red-800 hover:text-amber-600 cursor-pointer " />
			}
			</div>
			
		</div>
	)
}

export default Header