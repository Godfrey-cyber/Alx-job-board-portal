import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable';
// packages
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { industry, experienceLevel } from "../assets/dummyData.js"
import { axiosInstance } from "../utilities/utilities.js"
import { useNavigate } from "react-router-dom"

const ShowcaseSection = () => {
	const [countryOptions] = useState(countryList().getData());

	const [formData, setFormData] = useState({
		location: "",
		industry: "",
		experienceLevel: "",
	});

	const navigate = useNavigate()

	console.log(formData)

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
	  	e.preventDefault();

		const params = new URLSearchParams();
	  	if (formData.industry) params.append("industry", formData.industry);
	    if (formData.experienceLevel) params.append("experienceLevel", formData.experienceLevel);
	    if (formData.location) params.append("location", formData.location);
	    console.log(params)
		try {
		    const res = await axiosInstance.get(`/jobs/get-jobs?${params.toString()}`);
			if (res.status === 200) {
				console.log(res.data)
		    	alert('Job retrived!');
		    	setFormData({
					location: "",
					industry: "",
					experienceLevel: "",
		    	})
		    	navigate(`/jobs/search/${params.toString()}`)
			}
		} catch (error) {
		    console.error('Error retrieving job:', error);
		    alert('Error retrieving job');
		 }
	};

	return (
		<div className="w-full px-2 md:px-10 lg:px-20 flex items-center justify-center min-h-screen lg:h-[500px] bg-gradient-to-l from-orange-500 via-orange-400 to-orange-500">
			<div className="flex flex-col justify-center items-center space-y-6 w-full ">
				<p className="text-2xl lg:text-4xl text-center text-white text-shadow-lg/20 font-semibold w-full lg:w-1/2">Explore and discover <br/>the right job for you!</p>
				<form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center justify-evenly bg-white rounded-md drop-shadow-lg shadow-gray-300 px-6 lg:h-28 h-72 w-full">
					<span className="flex border-none w-64 h-10">
						<Select
							className="rounded-md outline-none hover:outline-none w-full h-full text-gray-500 text-sm"
						  	options={industry}
						  	placeholder="e.g. Software & Data"
						  	value={industry.find(option => option.value === formData.industry)}
						  	onChange={(selected) => {
						    setFormData(prev => ({
						      ...prev,
						      industry: selected.value,
						    }));
						  }}
						/>
					</span>
					<span className="flex border-none w-64 h-10">
						<Select
							type="text"
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
							className="rounded-md outline-none hover:outline-none w-full h-full text-gray-500 text-sm"
						/>
					</span>
					<span className="flex border-none w-64 h-10 ">
						<Select
							className="rounded-md outline-none hover:outline-none w-full h-full text-gray-500 text-sm"
						  	options={experienceLevel}
						  	placeholder="e.g. Entry Level"
						  	value={experienceLevel.find(option => option.value === formData.experienceLevel)}
						  	onChange={(selected) => {
						    setFormData(prev => ({
						      ...prev,
						      experienceLevel: selected.value,
						    }));
						  }}
						/>
					</span>
					<button type="submit" className="text-sm font-bold px-3 py-2 bg-red-700 rounded-md h-12 min-w-[200px] w-full lg:max-w-[250px] text-white">Find A Job</button>
				</form>
			</div>
		</div>
	)
}

export default ShowcaseSection