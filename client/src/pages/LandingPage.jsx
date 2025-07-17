import React, { useState } from 'react'
import Header from "../components/Header.jsx"
import ShowcaseSection from "../components/ShowcaseSection.jsx"
import Experience from "../components/Experience.jsx"
import Companies from "../components/Companies.jsx"
import Advance from "../components/Advance.jsx"
import JobHunting from "../components/JobHunting.jsx"
import FromEmployers from "../components/FromEmployers.jsx"
import Footer from "../components/Footer.jsx"
import ScrollUpward from "../components/ScrollUpward.jsx"
import UserModal from "../components/UserModal.jsx"
import Jobs from "../components/Jobs.jsx"
import { motion } from "framer-motion";

const LandingPage = () => {
	const [isModalOpen2, setIsModalOpen2] = useState(false);
	return (
		<div className="w-full bg-white">
			<Header setIsModalOpen2={setIsModalOpen2} />
			<ShowcaseSection />
			<Experience />
			<Jobs />
			<Companies />
			<Advance />
			<JobHunting />
			<FromEmployers />
			<Footer />
			<ScrollUpward />
			<UserModal  
                isOpen2={isModalOpen2} 
                onClose2={() => setIsModalOpen2(false)} 
            />
		</div>
	)
}

export default LandingPage