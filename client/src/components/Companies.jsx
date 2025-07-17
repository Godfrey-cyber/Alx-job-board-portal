import React, { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { companies } from "../assets/dummyData.js"

const Companies = () => {
	const navigate = useNavigate()
	const containerRef = useRef(null)

	const scrollLeft = () => {
		containerRef.current.scrollBy({
			left: -300,
		    behavior: 'smooth',
		})
	}

	const scrollRight = () => {
	  	containerRef.current.scrollBy({
		    left: 300,
		    behavior: 'smooth',
		})
	}
	return (
		<div className="flex flex-col w-full h-auto px-2 md:px-10 lg:px-20 bg-white my-12">
			<p className="text-2xl font-bold text-center text-gray-700">Companies currently hiring in Kenya</p>
			<div ref={containerRef} className="flex justify-center space-y-4 lg:space-x-8 items-center overflow-x-auto my-10 w-full scroll-smooth">
				{companies.map(item => (
					<div key={item.id} className="flex rounded-md cursor-pointer w-full h-full lg:w-20 lg:h-20">
						<img className="w-full h-full rounded-md" src={item.image} alt="" />
					</div>
				))}
			</div>
			<span onClick={() => navigate("/companies-hiring")} className="flex w-full justify-center my-6">
				<button className="text-sm font-semibold bg-white rounded-md border border-amber-700 text-red-800 w-fit px-4 py-3 cursor-pointer hover:bg-red-700 hover:text-white transition-all delay-300">See All Companies Hiring</button>
			</span>
		</div>
	)
}

export default Companies