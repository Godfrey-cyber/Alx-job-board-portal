import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../utilities/utilities.js"

const Jobs = () => {
	const [jobs, setJobs] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const controller = new AbortController();
		const getJobs = async () => {
			try {
				const res = await axiosInstance.get(
					'/jobs/get-jobs',
					{
						signal: controller.signal,
					}
				);
				if (res.status === 200) {
					setJobs(res.data.jobs);
					console.log(jobs);
					console.log(res.data.jobs);
				}
			} catch (error) {
				if (error.name === 'CanceledError') {
					// toast.error('Soory! • An error occured')
					console.log(error, "An error happened")
				} else {
					// toast.error('Soory! • An error occured')
					console.log(error, "An error happened")
				}
			}
		};
		getJobs();
		return () => controller.abort();
	}, []);
	return (
		<div className="flex flex-col w-full h-auto px-2 md:px-10 lg:px-20 bg-white my-12">
			<div className="grid grid-cols-12 gap-4 overflow-x-auto my-6 w-full scroll-smooth">
					{jobs && jobs?.slice(0, 8).map(item => (
						<div key={item._id} onClick={() => navigate(`/job/${item._id}`)} className="flex flex-col col-span-12 md:col-span-6 lg:col-span-3 justify-self-center space-y-4 p-4 border border-gray-400 rounded-md w-64 h-48 lg:w-62 lg:w-72 cursor-pointer">
							<p className="text-sm text-gray-800 font-semibold">{item.title}</p>
							<p className="text-xs text-gray-800 font-semibold">{item.title}</p>
							<p className="text-sm text-gray-500 font-normal">Max Salary Ksh. {item.maxSalary}</p>
							<span className="flex space-x-2 items-center">
								<p className="text-sm text-blue-600 font-normal">{item.employmentType}</p>
								<p className="text-sm text-blue-600 font-normal">{item.location}</p>
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default Jobs