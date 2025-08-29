import { useSearchParams, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from "../components/Header.jsx"
import { axiosInstance } from "../utilities/utilities.js"
import 'react-toastify/dist/ReactToastify.css';
import { formatDistanceToNow } from 'date-fns'
import { ToastContainer, toast } from 'react-toastify';

const SearchJobs = () => {
	const [searchParams] = useSearchParams();
  	const [jobs, setJobs] = useState([]);
  	const location = useLocation()
  	console.log(location.search)

  	 useEffect(() => {
  	 	const fetchJobs = async () => {
	  	 	
		  	const industry = searchParams.get('industry');
		  	const location = searchParams.get('location');
		  	const experienceLevel = searchParams.get('experienceLevel');

		  	const params = new URLSearchParams();
		  	if (industry) params.append("industry", industry);
		    if (experienceLevel) params.append("experienceLevel", experienceLevel);
		    if (location) params.append("location", location);

		    if (industry || location || experienceLevel) {
			    try {
			        const res = await axiosInstance.get(`/jobs/get-jobs?${params.toString()}`);
			        setJobs(res.data.jobs);
			        console.log(res.data.jobs)
			      } catch (error) {
			        console.error('Error fetching jobs:', error);
			    }
			} else {
				console.log("No fields provided")
			}
	  	}
	  	fetchJobs();
  	}, [searchParams]);

  	 console.log(searchParams)

  	// if (!industry || !location || !experienceLevel) return <p>Missing search info</p>;
	return (
		<div className="w-full bg-white">
			<Header />
			<div className="grid grid-cols-12 gap-4 bg-white h-screen my-10 px-5 md:px-10 lg:px-20 bg-red-400 w-full">
				{jobs && jobs?.length === 0 && <div className="hidden text-sm font-semibold text-gray-800 flex justify-center h-52 items-center col-span-12 lg:col-span-8 lg:flex flex-col space-y-3 rounded-md border border-gray-200 h-64">No Jobs found that matches your query.</div>}
		        {jobs && jobs?.map((job) => (
		          <div className="col-span-12 lg:col-span-8 flex flex-col justify-between space-y-6 rounded-md border border-gray-200 h-52 p-3" key={job._id}>
		          <span className="flex flex-col space-y-3">
		          	{!jobs ? <div className="h-4 bg-gray-100 rounded-sm w-1/2 animate-pulse"></div> : <p className="text-lg font-semibold text-gray-500">{job.title}</p>}
		          	<p className="text-sm font-semibold text-blue-500">{job.employmentType}</p>
		          	
		          </span>
		          <span className="flex flex-row items-center space-x-4">
		          	<p className="text-sm bg-red-100 rounded-sm px-3 py-1 font-normal text-gray-500">{job.location}</p>
		          	<p className="text-sm bg-red-100 rounded-sm px-3 py-1 font-normal text-gray-500">Ksh.{job.minSalary} - {job.maxSalary}</p>
		          	<p className="text-sm bg-red-100 rounded-sm px-3 py-1 font-normal text-gray-500">{job.employmentType}</p>
		          </span>
		          <span className="flex flex-row items-center space-x-4">
		          	<p className="text-sm font-semibold text-gray-700">Job Function: {job.industry}</p>
		          	<p className="text-sm font-semibold text-gray-600">{job.experienceLevel}</p>
		          	{job.createdAt && !isNaN(new Date(job.createdAt)) && (
					  <p className="text-sm font-normal text-gray-500">Posted {" "}
					    {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
					  </p>
					)}
		          </span>
		          </div>
		        ))}
		      <div className="hidden lg:col-span-4 lg:flex flex-col space-y-3 rounded-md border border-gray-200 h-64">
		      	Hello
		      </div>
		    </div>
		</div>
	)
}

export default SearchJobs