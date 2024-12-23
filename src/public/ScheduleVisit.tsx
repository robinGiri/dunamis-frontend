import React, { useState } from 'react';

const ScheduleVisit: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Date: ${date}\nEmail: ${email}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Schedule a Visit</h2>

      <form
        onSubmit={handleSubmit}
        className="border rounded-lg shadow-md p-6 bg-white"
      >
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">Select date</h3>
        </div>

        {/* Date Input */}
        <div className="mb-6 flex items-center border-b border-gray-300 pb-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full text-gray-600 placeholder-gray-400 focus:outline-none"
            placeholder="Enter Date..."
            required
          />
          <span className="ml-2 text-gray-500">
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
                d="M8 7v.01M8 12v.01M8 17v.01M12 7v.01M12 12v.01M12 17v.01M16 7v.01M16 12v.01M16 17v.01M4 4h16c1.1046 0 2 .8954 2 2v12c0 1.1046-.8954 2-2 2H4c-1.1046 0-2-.8954-2-2V6c0-1.1046.8954-2 2-2z"
              />
            </svg>
          </span>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-300 pb-2 text-gray-600 placeholder-gray-400 focus:outline-none"
            placeholder="Enter your email..."
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleVisit;
