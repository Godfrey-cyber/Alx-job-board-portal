import React, { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { experience } from "../assets/dummyData.js"

const Experience = () => {
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
			<p className="text-2xl font-bold text-center text-gray-700">Find the right job vacancies in Kenya</p>
			<div className="flex flex-col items-start justify-center my-2 space-y-3">
				<p className="text-2xl font-bold text-start text-gray-700">Experience-based filtering.</p>
				<div className="lg:flex-row flex flex-col items-center justify-between w-full">
					<p className="text-sm font-normal text-start text-gray-600">Find jobs that suit your experience level</p>
					<div className="flex items-center space-x-3">
						<p className="text-sm font-semibold text-gray-700">View More Experience Levels</p>
						<span className="flex space-x-2 items-center">
							<MdOutlineChevronLeft onClick={scrollLeft} className="h-8 w-8 text-gray-500 hover:text-amber-600 cursor-pointer" />
							<MdOutlineChevronRight onClick={scrollRight} className="h-8 w-8 text-gray-500 hover:text-amber-600 cursor-pointer" />
						</span>
					</div>
				</div>
				<div ref={containerRef} className="flex items-center space-x-3 overflow-x-auto my-6 w-full scroll-smooth">
					{experience.map(item => (
						<div key={item.id} className="flex flex-col space-y-4 p-4 border border-gray-400 rounded-md w-52 h-48 lg:w-1/5 lg:min-w-1/4">
							<p className="text-sm text-gray-800 font-semibold">{item.title}</p>
							<p className="text-sm text-gray-500 font-normal">{item.count} Jobs</p>
							<span className="flex space-x-2 items-center">
								<p className="text-sm text-blue-600 font-normal">Explore More Jobs</p>
								<MdOutlineChevronRight className="h-8 w-8 text-blue-600 hover:text-amber-600 cursor-pointer" />
							</span>
						</div>
					))}
				</div>
				<span onClick={() => navigate("/jobs")} className="flex w-full justify-center my-6">
					<button className="text-sm font-semibold bg-red-800 rounded-md text-white w-fit px-4 py-3 cursor-pointer hover:bg-red-700 transition-all delay-300">Explore All Jobs</button>
				</span>
			</div>
		</div>
	)
}

export default Experience