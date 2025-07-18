import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
// packages
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from "axios"
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
// files
import Header from '../components/Header.jsx';
import { industry, options, jobTypes, employmentMode, workBenefits, footerLinks, experienceLevel } from "../assets/dummyData.js"
import { axiosInstance } from "../utilities/utilities.js"

const PostAJob = () => {
	const [uploading, setUploading] = useState(false);
	const { user, loading, error, accessToken, isAuthenticated } = useSelector(
		state => state.auth
	);

	const [countryOptions] = useState(countryList().getData());

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		benefits: [""],
		requirements: [""],
		categories: [""],
		tags: [""],
		minSalary: "",
		maxSalary: "",
		location: "",
		industry: "",
		employmentType: "",
		experienceLevel: "",
		applicationDeadline: ""
	});

	// const { title, description, benefits, requirements, categories, tags, minSalary, maxSalary, location, employmentType, applicationDeadline } = formData;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	console.log(formData);

	const handleSubmit = async (e) => {
	  e.preventDefault();

	  const payload = {
	    ...formData,
	    maxSalary: Number(formData.maxSalary),
	    minSalary: Number(formData.minSalary),
	  };

	  try {
	    const res = await axiosInstance.post('/jobs/add-job', payload, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		if (res.status === 201) {
			console.log(res.data)
	    	setFormData({
	    		title: "",
				description: "",
				benefits: [""],
				requirements: [""],
				categories: [""],
				tags: [""],
				minSalary: "",
				maxSalary: "",
				location: "",
				industry: "",
				employmentType: "",
				experienceLevel: "",
				applicationDeadline: ""
	    	})
	    	toast.success("Successfully Created a Job in🥇")
	    	console.log(res.data.job)
	    	// navigate()
		}
	    // Optionally reset formData here
	  } catch (error) {
	    console.error('Error creating job:', error);
	    toast.error(err?.response?.data?.msg)
	  }
	};
	return (
		<div className="w-full h-full flex flex-col ">
			<Header />
			<div className="flex flex-col px-2 md:px-10 lg:px-20 my-6">
				<p className="text-3xl font-bold text-gray-600 my-6">Add Job.</p>
				<form
					onSubmit={handleSubmit}
					action=""
					className="grid grid-cols-12 gap-4 border border-gray-300 p-5 w-full"
				>
					<div className="col-span-12 lg:col-span-6 flex flex-col space-y-3">
						<label className="text-sm text-gray-600 my-1 font-semibold" htmlFor="name">Title/Name</label>
						<span className="flex border border-gray-300 rounded-md h-12">
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleChange}
								id="name"
								placeholder="Job Name"
								className="rounded-md outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
							/>
						</span>
						<div className="flex flex-col space-y-2">
							<label className="text-sm text-gray-600 my-1 font-semibold" htmlFor="applicationDeadline">Application Deadline</label>
							<span className="flex border border-gray-300 rounded-md h-12">
								<input
									type="date"
									name="applicationDeadline"
									value={formData.applicationDeadline}
									onChange={handleChange}
									id="name"
									placeholder="Job Name"
									className="rounded-md outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
								/>
							</span>
						</div>
						<div className="flex flex-col space-y-2">
							<label className="text-sm text-gray-600 my-1 font-semibold" htmlFor="longitude">Experience Level</label>
							<span className="flex border-none">
								<Select
								className="rounded-md outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
							  	options={experienceLevel}
							  	value={experienceLevel.find(option => option.value === formData.experienceLevel)}
							  	onChange={(selected) => {
							    setFormData(prev => ({
							      ...prev,
							      experienceLevel: selected.value,
							    }));
							  }}
							/>
							</span>
						</div>

						<div className="flex flex-col space-y-2">
							<label className="text-sm text-gray-600 my-1 font-semibold" htmlFor="longitude">Industry</label>
							<span className="flex border-none">
								<Select
								className="rounded-md outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
							  	options={industry}
							  	value={industry.find(option => option.value === formData.industry)}
							  	onChange={(selected) => {
							    setFormData(prev => ({
							      ...prev,
							      industry: selected.value,
							    }));
							  }}
							/>
							</span>
						</div>

						<div className="grid grid-cols-12 gap-4 w-full">
							<div className="flex flex-col space-y-2 col-span-12 md:col-span-6">
								<label className="text-sm text-gray-600 my-1 font-semibold" htmlFor="countryOptions">Location</label>
								<span className="flex ">
									<Select
									type="text"
									// className="flex border border-gray-400 outline-none  rounded-md h-full w-full"
									options={countryOptions}
									name="location" 
									value={countryOptions.find(option => option.value === formData.location)}
									onChange={(selected) => {
								    setFormData(prev => ({
								        ...prev,
								        location: selected.value,
								        },
								      ));
								    }}
									id="name"
									placeholder="e.g. Kenya"
									className="rounded-md outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
								/>
								</span>
							</div>
							<div className="flex flex-col space-y-2 col-span-12 md:col-span-6">
								<label className="text-sm text-gray-600 my-1 font-semibold" htmlFor="employmentType">Employment Type</label>
								<span className="flex ">
									<Select
									placeholder="e.g. Data & Software"
									className="rounded-md outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
								  	options={employmentMode}
								  	value={employmentMode.find(option => option.value === formData.employmentType)}
								  	onChange={(selected) => {
								    setFormData(prev => ({
								      ...prev,
								      employmentType: selected.value,
								    }));
								  }}
								/>
								</span>
							</div>
						</div>

						{/*Host details*/}
						<label className="text-lg text-gray-600 my-1 font-semibold" htmlFor="name">Remuneration</label>
						<div className="grid grid-cols-12 gap-4">
							<div className="flex flex-col space-y-2 col-span-12 md:col-span-6">
								{/*<div className="">*/}
								<label className="text-sm text-gray-600 my-1 font-semibold" htmlFor="longitude">Maxmum Salary</label>
								<span className="flex border border-gray-300 rounded-md h-12">
									<input
										type="number"
								        name="maxSalary"
								        value={formData.maxSalary}
								        onChange={handleChange}
										id="name"
										placeholder="Max Salary"
										className="rounded-md outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
									/>
								</span>
							</div>
							<div className="flex flex-col space-y-2 col-span-12 md:col-span-6">
								<label className="text-sm text-gray-600 my-1 font-semibold" htmlFor="longitude">Minmum Salary</label>
								<span className="flex border border-gray-300 rounded-md h-12">
									<input
										type="number"
								        name="minSalary"
								        value={formData.minSalary}
								        onChange={handleChange}
										id="name"
										placeholder="Min Salary"
										className="rounded-md outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
									/>
								</span>
							</div>
						</div>
						{/*// Job description*/}
						<label className="text-sm text-gray-600 my-1 font-semibold my-2" htmlFor="name">Job Description</label>
						<span className="flex border border-gray-400 rounded-md h-72 w-full">
							<textarea
								type="text"
								name="description" value={formData.description} onChange={handleChange}
								id="name"
								placeholder="Job Description"
								className="flex flex-col items-center justify-center outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
							/>
						</span>
						<label className="text-sm text-gray-600 my-1 font-semibold my-2" htmlFor="name">Job Requirements</label>
						<span className="flex border border-gray-400 rounded-md h-72 w-full">
							<textarea
								type="text"
								name="requirements" value={formData.requirements} onChange={handleChange}
								id="name"
								placeholder="Job Requirements"
								className="flex flex-col items-center justify-center outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
							/>
						</span>
					</div>
					<div className="col-span-12 md:col-span-6 flex flex-col space-y-3">
						<label className="text-sm text-gray-600 my-1 font-semibold my-2" htmlFor="name">Job Skills</label>
						<span className="flex ">
							<CreatableSelect
								  placeholder="e.g. Python"
									className="rounded-md outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
								  isMulti
								  onChange={(selected) => setFormData(prev => ({
								    ...prev,
								    tags: selected.map(opt => opt.value)
								  }))}
								  options={options}
							/>
						</span>
						<div className="grid grid-cols-12 gap-4">
							<div className="flex flex-col space-y-2 col-span-12 md:col-span-6">
								<label className="text-sm text-gray-600 my-1 font-semibold my-2" htmlFor="name">Category</label>
								<span className="flex">
									<CreatableSelect
									  placeholder="e.g. Software & Data"
										className="rounded-md outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
									  isMulti
									  onChange={(selected) => setFormData(prev => ({
									    ...prev,
									    categories: selected.map(opt => opt.value)
									  }))}
									  options={jobTypes}
									/>
								</span>
							</div>
							<div className="flex flex-col space-y-2 col-span-12 md:col-span-6">
								<label className="text-sm text-gray-600 my-1 font-semibold my-2" htmlFor="name">Benefits</label>
								<span className="flex ">
									<CreatableSelect
									  placeholder="e.g. Paid annual Leave"
										className="rounded-md outline-none hover:outline-none w-full h-full px-3 py-1 text-gray-500 text-sm"
									  isMulti
									  onChange={(selected) => setFormData(prev => ({
									    ...prev,
									    benefits: selected.map(opt => opt.value)
									  }))}
									  options={workBenefits}
									/>
								</span>
							</div>
						</div>
					</div>
					{/*</div>*/}
					
					<button className="bg-blue-700 rounded-md px-4 w-full md:w-fit py-3 text-white font-semibold text-sm" type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default PostAJob;
