import React, { useState } from 'react';
import Course from './Course';

const Degree: React.FC = () => {
  const [selectedDegree, setSelectedDegree] = useState<string>('Diploma');

  const courses = {
    Diploma: [
      {
        title: 'Diploma in Data Science and Analytics',
        image: 'https://picsum.photos/seed/picsum/200/300',
        rating: 4,
      },
      {
        title: 'Diploma in Graphic Design and Photography',
        image: 'https://picsum.photos/200/300/?blur',
        rating: 5,
      },
      {
        title: 'Diploma in Business Administration and Management',
        image: 'https://picsum.photos/seed/picsum/200/300',
        rating: 5,
      },
    ],
    Bachelor: [
      {
        title: 'Bachelor in Computer Science',
        image: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
        rating: 4,
      },
      {
        title: 'Bachelor in Marketing and Sales',
        image: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
        rating: 4,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h2 className="text-3xl font-bold pr-4">Degrees</h2>
        <select
          value={selectedDegree}
          onChange={(e) => setSelectedDegree(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses[selectedDegree].map((course, index) => (
          <Course
            key={index}
            title={course.title}
            image={course.image}
            rating={course.rating}
            onApply={() => alert(`Applied for ${course.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Degree;
