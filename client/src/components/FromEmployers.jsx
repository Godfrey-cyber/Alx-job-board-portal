import React from 'react'

const FromEmployers = () => {
	return (
		<div className="flex flex-col w-full h-auto px-2 md:px-10 lg:px-20 h-[500px] bg-gradient-to-l from-orange-500 via-orange-400 to-orange-500 my-12 p-4">
			<div className="grid grid-cols-12 gap-4">
				<div className="flex flex-col justify-center col-span-12 lg:col-span-8 space-y-4 ">
					<p className="text-lg text-white font-normal">FROM EMPLOYERS</p>
					<p className="text-2xl text-white font-semibold">Searching for the right talent?</p>
					<p className="text-2xl text-white font-normal">We have over 1.1 Million job-seekers across all levels, right for your organisation!</p>
					<button className="text-sm font-semibold text-white bg-red-800 rounded-md px-4 py-3 w-fit cursor-pointer hover:bg-red-700">Learn More</button>
				</div>
				<div className="flex col-span-12 lg:col-span-4">
					<img className="" src="https://www.brightermonday.co.ke/static-assets/img/brightermonday-theme/home-page/right-talent-desktop.png" alt="" />
				</div>
			</div>
		</div>
	)
}

export default FromEmployers