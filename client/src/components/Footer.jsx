import React from 'react'
import { footerLinks, links } from "../assets/dummyData.js"

const Footer = () => {
	return (
		<footer className="flex flex-col w-full px-2 md:px-10 lg:px-20 bg-white h-fit py-8">
			<p className="text-3xl font-bold text-black my-4 text-center">Explore jobs in Kenya by job function</p>
			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
	        <div>
	          {/*<h2 className="text-lg font-semibold mb-4 text-red-800">Job footerLinks</h2>*/}
	          <ul className="space-y-6 text-sm">
	            {footerLinks.slice(0, 7).map((cat, idx) => (
	              <li key={idx} className="hover:text-blue-700 cursor-pointer">{cat}</li>
	            ))}
	          </ul>
	        </div>

	        <div>
	          {/*<h2 className="text-lg font-semibold mb-4 text-red-800">More footerLinks</h2>*/}
	          <ul className="space-y-6 text-sm">
	            {footerLinks.slice(7, 14).map((cat, idx) => (
	              <li key={idx} className="hover:text-blue-700 cursor-pointer">{cat}</li>
	            ))}
	          </ul>
	        </div>

	        <div>
	          {/*<h2 className="text-lg font-semibold mb-4 text-red-800">Even More</h2>*/}
	          <ul className="space-y-6 text-sm">
	            {footerLinks.slice(14, 21).map((cat, idx) => (
	              <li key={idx} className="hover:text-blue-700 cursor-pointer">{cat}</li>
	            ))}
	          </ul>
	        </div>

	        
	      </div>
	      <div>
	          <h2 className="text-lg font-semibold mb-4 text-white">Quick Links</h2>
	          <ul className="flex items-center justify-between space-x-4 divide-x divide-gray-400 text-sm">
	            {links.map((link, idx) => (
	              <li key={idx} className="text-sm cursor-pointer text-blue-700 hover:font-semibold cursor-pointer px-6">{link}</li>
	            ))}
	          </ul>
	        </div>
	      <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-center text-gray-500">
	        © {new Date().getFullYear()} JobBoard Inc. All rights reserved.
	      </div>
		</footer>
	)
}

export default Footer