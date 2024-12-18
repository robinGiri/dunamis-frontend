import React from 'react';
import heroIllustration from '../assets/illustration.png';

interface HeroProps {
  onEnter?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  onEnter,
}) => {
  return (
    <section className="relative w-full bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        
        {/* Left Content */}
        <div className="md:w-1/2 space-y-4 md:pr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why <span className="text-blue-600">Dunamis?</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Enter ye the gateway of knowledge, and thy path to wisdom shall be illuminated.
          </p>
          <button
            onClick={onEnter}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enter
          </button>
        </div>

        {/* Illustration / Right Content */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src={heroIllustration}
            alt="Illustration"
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
