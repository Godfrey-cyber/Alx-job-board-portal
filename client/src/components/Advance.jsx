import React from 'react'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';

const Advance = () => {
	return (
		<div className="flex flex-col w-full px-2 md:px-10 lg:px-20 bg-gray-900 h-fit lg:h-[500px] py-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="flex flex-col space-y-6">
					<p className="text-4xl text-start text-white font-semibold ">Advance your career <br/>with Lancer platform</p>
					<p className="text-sm font-normal text-start text-white">Create a free account, complete your profile, <br/>and get matched with your dream job.</p>
					<span className="flex space-x-4 items-center">
						<button className="text-white bg-red-800 rounded-md w-fit px-4 py-3 cursor-pointer hover:bg-red-700">Get Started</button>
						<button className="flex space-x-3 items-center text-white bg-transparent rounded-md w-fit px-4 py-3 cursor-pointer">Learn More <MdOutlineChevronRight className="h-8 w-8 text-gray-500 hover:text-amber-600 cursor-pointer" /></button>
					</span>
					<div className="flex space-x-6 items-center">
						<span className="flex flex-col space-y-3">
							<p className="text-sm font-semibold text-start text-white">Get seen by employers.</p>
							<p className="text-sm font-normal text-start text-gray-400">With a complete profile, your applications and profile are promoted to top employers, so you stand out.</p>
						</span>
						<span className="flex flex-col space-y-3">
							<p className="text-sm font-semibold text-start text-white">Access the best jobs for you</p>
							<p className="text-sm font-normal text-start text-gray-400">Sign up for customised job alerts matching your experience, preferred industry, function and location.</p>
						</span>
					</div>
				</div>
				<div className="flex flex-col space-y-6">
					<img src="https://www.brightermonday.co.ke/static-assets/img/brightermonday-theme/home-page/advance-your-career.png" alt="" />
				</div>
			</div>
		</div>
	)
}

export default Advance