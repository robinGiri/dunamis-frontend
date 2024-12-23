import React from 'react';

const Bottom: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-10">
      {/* Top Section */}
      <div className="text-center text-sm text-gray-600 mb-8">
        <span>Teaching the Word</span>
        <span className="mx-4">•</span>
        <span>Reaching the Unreached</span>
        <span className="mx-4">•</span>
        <span>Awakening the Nations</span>
      </div>

      {/* Middle Section */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Left Column */}
        <div className="space-y-4 text-gray-700 font-medium">
          <p className="hover:text-black cursor-pointer">Give</p>
          <p className="hover:text-black cursor-pointer">Internship</p>
          <p className="hover:text-black cursor-pointer">Announcement</p>
        </div>

        {/* Center Column */}
        <div className="space-y-4 text-gray-700 font-medium text-center sm:text-left">
          <p className="hover:text-black cursor-pointer">About</p>
          <p className="hover:text-black cursor-pointer">Contact</p>
          <p className="hover:text-black cursor-pointer">FAQs</p>
        </div>

        {/* Right Column */}
        <div className="text-center sm:text-right">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-56 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17.34 10.59a6.75 6.75 0 11-9.5-9.5 6.75 6.75 0 019.5 9.5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-lg font-semibold text-gray-900">
        Dunamis <span className="font-light">Online</span>
      </div>
    </footer>
  );
};

export default Bottom;
