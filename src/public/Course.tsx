import React from 'react';

interface CourseProps {
  title: string;
  image: string;
  rating: number;
  onApply: () => void;
}

const Course: React.FC<CourseProps> = ({ title, image, rating, onApply }) => {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden bg-white">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center mt-2 mb-4">
          {Array.from({ length: rating }).map((_, index) => (
            <span key={index} className="text-yellow-500 text-xl">★</span>
          ))}
          {Array.from({ length: 5 - rating }).map((_, index) => (
            <span key={index} className="text-gray-300 text-xl">★</span>
          ))}
        </div>
        <button
          onClick={onApply}
          className="mt-2 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Course;
