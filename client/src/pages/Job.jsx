import React, { useState, useEffect } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FaShareNodes, FaHeart } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../utilities/utilities.js';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

const Job = () => {
	const [job, setJob] = useState([]);
	const { id } = useParams();
	const { accessToken } = useSelector(state => state.auth);
	const path = useParams();
	console.log(id)
	useEffect(() => {
		const controller = new AbortController();
		const getJobs = async () => {
			try {
				const res = await axiosInstance.get(`/jobs/get-job/${id}`,
					{
						signal: controller.signal,
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				if (res.status === 200) {
					setJob(res.data.result);
					console.log('Fetched job:', res.data.result);
				}
			} catch (error) {
				if (error.code === 'ERR_CANCELED') {
					console.log('Request canceled');
				} else if (error.response && error.response.status === 401) {
					console.log('User not authenticated', error);
				} else {
					console.log('Error fetching job:', error);
				}
			}
		};
		getJobs();
		return () => controller.abort();
	}, [id, accessToken]);
	return (
		<div className="w-full bg-white h-fit">
			<Header />
			<div className="w-full h-full px-2 md:px-10 lg:px-20 my-8">
				<span className="min-h-36 bg-white w-full flex flex-col space-y-3">
					<p className="text-xl font-semibold text-gray-800">{job?.title}</p>
					<p className="text-sm font-normal text-gray-500">Posted 56 Mins ago</p>
					<p className="text-sm font-normal text-gray-500">{job.industry}</p>
				</span>
				<hr className="border border-gray-300 my-3" />
				<span className="min-h-36 bg-white w-full flex flex-col space-y-3">
					<p className="text-sm font-semibold text-gray-800">Summary.</p>
					<p className="text-sm font-normal text-gray-800">{job?.description}</p>
				</span>
				<hr className="border border-gray-300 my-3" />
				<span className="min-h-36 bg-white w-full flex items-center justify-between space-y-3">
					<p className="text-sm font-semibold text-gray-800">More than 30 hrs/week.</p>
					<p className="text-sm font-normal text-gray-800">{job.experienceLevel}</p>
					<p className="text-sm font-normal text-gray-800">{job?.employmentType}.</p>
				</span>
				<hr className="border border-gray-300 my-3" />
				<div className="min-h-36 bg-white w-full flex flex-col space-y-3">
					<p className="text-lg font-semibold text-gray-800">Skills and Expertise.</p>
					<p className="text-sm font-normal text-gray-800">Mandatory skills.</p>
					<span className="flex items-center space-x-4">
						{job?.tags?.map(tag => (
							<p key={tag} className="text-gray-600 bg-gray-200 rounded-3xl px-3 py-1">{tag}</p>
						))}
					</span>
				</div>
				<div className="min-h-36 bg-white w-full flex flex-col space-y-3">
					<p className="text-lg font-semibold text-gray-800">Requirements.</p>
					<span className="flex flex-col space-y-3">
						{job?.requirements?.map(requirement => (
							<p key={requirement} className="text-gray-700">{requirement}</p>
						))}
					</span>
				</div>
				<hr className="border border-gray-300 my-3" />
				<div className="min-h-36 bg-white w-full flex flex-col space-y-3">
					<p className="text-lg font-semibold text-gray-800">Benefits.</p>
					<span className="flex flex-col space-y-3">
						{job?.benefits?.map(benefit => (
							<p key={benefit} className="text-gray-700">{benefit}</p>
						))}
					</span>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Job