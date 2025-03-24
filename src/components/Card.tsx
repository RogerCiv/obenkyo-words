// src/components/Card.tsx
import React, { useState } from 'react';

interface CardProps {
  japanese: string;
  spanish: string;
  romanji: string;
}

const Card: React.FC<CardProps> = ({ japanese, spanish, romanji }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`relative w-64 h-48 bg-white rounded-md shadow-md transition-transform duration-500 ${
        isFlipped ? 'rotate-y-180' : ''
      }`}
      onClick={handleClick}
    >
      {/* Cara frontal (japonés) */}
      <div className={`absolute w-full h-full flex flex-col items-center justify-center bg-white rounded-md transition-opacity duration-300 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-500 mb-2">{romanji}</div>
          <div className="text-4xl font-semibold">{japanese}</div>
        </div>
      </div>
      {/* Cara trasera (español) */}
      <div className={`absolute w-full h-full flex items-center justify-center text-xl text-gray-800 bg-gray-200 rounded-md rotate-y-180 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
        {spanish}
      </div>
    </div>
  );
};

export default Card;