import React from "react"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom"

const SidebarIcons = ({ Icon, title, route }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const path = location.pathname.split("/")[1]
	console.log(path)
	const altPath = '/'
    return (
    	<div onClick={() => navigate(`/${route}`)} className={`flex items-center hover:bg-gray-100  space-x-2 px-4 py-2 cursor-pointer group ${path == route ? 'bg-gray-100' : ''}`}>
			<Icon className={`text-gray-800 group-hover:text-amber-500 h-8 w-8 ${path == route ? 'text-amber-500' : ''}`} />
			<span className="flex items-center justify-between w-full">
				<p className={`text-sm font-semibold group-hover:text-gray-600 ${path == route ? '' : 'text-gray-700'}`}>{title}</p>
			</span>
		</div>
    )
}

export default SidebarIcons