import React from 'react'

const JobHunting = () => {
	return (
		<div className="flex flex-col w-full h-auto px-2 md:px-10 lg:px-20 bg-white my-12">
			<div className="grid grid-cols-12 gap-4">
				<div className="flex col-span-12 lg:col-span-4">
					<img className="" src="https://www.brightermonday.co.ke/static-assets/img/brightermonday-theme/write-sea/level-up-your-cv-game-banner.png" alt="" />
				</div>
				<div className="flex flex-col justify-center col-span-12 lg:col-span-8 space-y-4 ">
					<p className="text-2xl text-gray-800 font-bold">Job Hunting? Use AI to Boost Your Career</p>
					<p className="text-sm font-normal">Create a compelling CV and cover Letter, practice for mock interviews, and negotiate your salary offers with one tool. FREE for one month.</p>
					<button className="text-sm font-semibold text-white bg-red-800 rounded-md px-4 py-3 w-fit cursor-pointer hover:bg-red-700">Try It Now</button>
				</div>
			</div>
		</div>
	)
}

export default JobHunting