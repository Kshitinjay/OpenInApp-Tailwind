import React, { useState } from 'react';
import googleIcon from "../images-icons/googleIcon.png";
import profilePic from "../images-icons/profilePic.png";
import DropZone from "../Components/DropZone"

const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="admin-page-parent flex flex-col sm:flex-row min-h-screen">
      <div className="sm:hidden">
        <button className="p-4" onClick={toggleMenu}>
          Open
        </button>
      </div>
      <div
        className={`admin-options flex flex-col left-sec w-1/5  ${
          isMenuOpen ? "block" : "hidden"
        } sm:flex`}
      >
        <div className="h-28 font-bold text-4xl px-5 py-2 text-center flex flex-col justify-center">
        Base
        </div>
        <div className="h-11 mt-3 opacity-50 pointer-events-none font-medium px-5 py-2">
          Dashboard
        </div>
        <div className="h-11 mt-3 text-blue-500 cursor-pointer font-medium px-5 py-2">
          Upload
        </div>
        <div className="h-11 mt-3 opacity-50 pointer-events-none font-medium px-5 py-2">
          Invoice
        </div>
        <div className="h-11 mt-3 opacity-50 pointer-events-none font-medium px-5 py-2">
          Schedule
        </div>
        <div className="h-11 mt-3 opacity-50 pointer-events-none font-medium px-5 py-2">
          Calendar
        </div>
        <div className="h-11 mt-3 opacity-50 pointer-events-none font-medium px-5 py-2">
          Notification
        </div>
        <div className="h-11 mt-3 opacity-50 pointer-events-none font-medium px-5 py-2">
          Settings
        </div>
      </div>
      <div className="right-sec w-4/5 pt-9 px-6">
        <div className="banner flex justify-between">
          <div className="font-semibold">Upload CSV</div>
          <div className="flex">
            <img src={googleIcon} className="w-6 h-6 mr-2" alt="Google Icon" />
            <img src={profilePic} className="w-6 h-6 ml-3" alt="Google Icon" />
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <DropZone />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
