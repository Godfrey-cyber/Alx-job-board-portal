import { motion } from "framer-motion";
import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx"

const UserModal = ({ isOpen2, onClose2, setIsModalOpen2 }) => {

  return (
    <div>
        {isOpen2 && (
            <div className="fixed inset-0 bg-faint-black bg-opacity-50 z-40" onClick={() => setIsModalOpen2(false)} />
        )}

      {/* Sliding Cart */}
        <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: isOpen2 ? "0%" : "100%" }} 
            transition={{ type: "spring", stiffness: 100 }} 
            className="flex flex-col fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 p-5 flex flex-col"
        >
        <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-lg font-semibold">Account Information</h2>
            <button className="text-white bg-amber-500 border border-amber-500 rounded-full flex items-center justify-center w-8 h-8 text-lg font-semibold cursor-pointer hover:text-gray-900" onClick={onClose2}>&times;</button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto mt-4 justify-center items-center h-full">
            <Sidebar />
        </div>

        {/* Checkout Button */}
       
            {/*<button className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700">Find A Job</button>*/}
      
      </motion.div>
    </div>
  );
};

export default UserModal;