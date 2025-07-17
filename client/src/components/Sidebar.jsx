import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaStar, FaRegComment, FaClipboardCheck,  } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { MdSpaceDashboard, MdOutlineBookmarkBorder, MdCastForEducation } from "react-icons/md";
import { RiUserSettingsLine, RiLockPasswordFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { IoIosHeartEmpty, IoIosLogOut } from "react-icons/io";
import { ImNewspaper } from "react-icons/im";
import { LuCalendarArrowUp } from "react-icons/lu";
import { FaGraduationCap, FaUserGraduate, FaRegUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice.js';
import SidebarIcons from "./SidebarIcons.jsx"
import { axiosInstance } from "../utilities/utilities.js"
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
	const navigate = useNavigate();
	const { user } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const logoutUser = async () => {
		// dispatch(logoutStart())
		try {
			const res = await axiosInstance.post('/auth/logout');
			if (res.status === 200 || res.statusText === 'OK') {
				dispatch(logout());
				navigate("/");
			}
		} catch (err) {
			if (err) {
				console.log(err);
			}
		}
	};
	return (
		// <div className="hidden lg:flex flex-col space-y-2 col-span-2 bg-green-600 h-screen">
		<div className="flex flex-col divide-y divide-gray-100 mt-12 py-3">
			<div className="flex flex-col flex-y-3 divide-gray-200">
	            <SidebarIcons route="dashboard" title="My Dashboard" Icon={MdSpaceDashboard} />
	            <SidebarIcons route="career-profile" title="Career Profile" Icon={FaUserGraduate} />
	            <SidebarIcons route="user/skill-assessment" title="My Skills Assessments" Icon={FaGraduationCap} />
	            <SidebarIcons route="user/order-history" title="My Order History" Icon={LuCalendarArrowUp} />
	            <SidebarIcons route="user/saved-jobs" title="My Saved Jobs" Icon={MdOutlineBookmarkBorder} />
	            <SidebarIcons route="user/courses" title="My Courses" Icon={MdCastForEducation} />
	            <SidebarIcons route="user/post-a-job" title="Post A Job" Icon={ImNewspaper} />
	        </div>
	        {user && (<div className="flex items-center space-x-5 my-4">
	        	<FaRegUserCircle className="h-9 w-9 text-red-800 hover:text-amber-600 cursor-pointer " />
	        	<span className="flex flex-col space-y-2">
	        		<p className="text-sm font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
	        		<p className="text-xs font-normal text-gray-500">{user.email}</p>
	        	</span>
	        </div>)}
	        {user ? <button onClick={logoutUser} className="bg-red-800 rounded-md px-4 cursor-pointer py-3 text-white text-sm font-normal">Logout</button> : <button onClick={() => navigate("/account/login")} className=" cursor-pointer bg-red-800 rounded-md px-4 py-3 text-white text-sm font-normal">Login</button>}
		</div>
		// </div>
	)
}

export default SideBar