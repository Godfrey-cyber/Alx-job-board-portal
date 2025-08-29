import React, { useState } from 'react'

const Application = () => {
	const [open, setOpen] = useState(false);

	return (
	    <div className="relative inline-block text-left">
	      <button
	        onClick={() => setOpen(!open)}
	        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
	      >
	        Account ▼
	      </button>

	      {open && (
	        <div
	          className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded shadow-lg z-50"
	          onMouseLeave={() => setOpen(false)}
	        >
	          <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
	            Profile
	          </a>
	          <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
	            Settings
	          </a>
	          <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
	            Logout
	          </a>
	        </div>
	      )}
	    </div>
	);
}

export default Application