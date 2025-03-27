import React from 'react';

interface CardProps {
  expression: string;
  meaning: string;
  reading: string;
  status?: boolean | null;
}

const Card: React.FC<CardProps> = ({ expression, meaning, reading}) => {
  return (
    <div className="relative group max-w-7xl h-72 bg-white rounded-md shadow-md transition-transform duration-500 hover:cursor-pointer">
      {/* Cara frontal (japonés) */}
      <div className="absolute w-full h-full flex flex-col items-center justify-center bg-white rounded-md transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex flex-col items-center">
          <div className="text-lg text-secondary mb-2">{reading}</div>
          <div className="text-4xl text-primary font-semibold">{expression}</div>
        </div>
      </div>
      {/* Cara trasera (español) */}
      <div className="absolute w-full h-full flex items-center justify-center text-3xl text-center text-gray-800 bg-gray-200 rounded-md transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        {meaning}
      </div>
    </div>
  );
};

export default Card;