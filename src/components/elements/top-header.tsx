import React from "react";

const TopHeader: React.FC = () => {
  return (
    <div className="bg-green-700 text-white text-sm">
      <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center space-y-2 sm:space-y-0">
        {/* Left Section */}
        <div className="flex space-x-4 flex-col items-center md:flex-row">
          <span>📞 +1 (555) 123-4567</span>
          <span>✉️ support@bekreata.com</span>
        </div>

        {/* Right Section */}
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            FAQ
          </a>
          <a href="#" className="hover:underline">
            Help Center
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
