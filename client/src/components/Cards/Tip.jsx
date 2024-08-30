import React from 'react';

const TipCard = ({ tip }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:scale-105 transition-transform duration-300 ease-in-out m-2">
      <div className="text-gray-700 text-md">
        <p>{tip}</p>
      </div>
    </div>
  );
};

export default TipCard;
