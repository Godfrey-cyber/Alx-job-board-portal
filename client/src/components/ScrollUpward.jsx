import { MdOutlineChevronRight } from 'react-icons/md';
import { FaChevronUp } from "react-icons/fa";
import React, { useEffect, useState } from 'react';

const ScrollUpward = () => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
	    if (window.pageYOffset > 300) {
	      setVisible(true);
	    } else {
	      setVisible(false);
	    }
	};

	const scrollToTop = () => {
	    window.scrollTo({
	      top: 0,
	      behavior: 'smooth',
	    });
  	};

  	useEffect(() => {
	    window.addEventListener('scroll', toggleVisibility);
	    return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);


	return (
		visible && (<div onClick={scrollToTop} className="flex fex-col justify-center items-center text-white hover:text-red-800 bg-red-800 hover:bg-white hover:border-red-800 rounded-full border-3 border-white h-12 w-12 fixed bottom-6 right-8 transition-all delay-300 animate-bounce ">
			<FaChevronUp className="h-6 w-6 text-white hover:text-amber-600 cursor-pointer hover:animate-ping" />
		</div>)
	)
}

export default ScrollUpward