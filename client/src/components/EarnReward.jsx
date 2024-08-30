import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const WayToEarnReward = () => {
  const rules = [
    "Complete more goals",
    "Participate in community activities",
    "Save more energy",
  ];

  return (
    <div className="h-full w-full flex justify-center items-center bg-gray-100">
      <div className="w-full p-4 bg-white shadow-lg rounded-lg overflow-y-auto">
        <h1 className="text-center underline font-bold text-xl md:text-3xl mb-4">Way to Earn Rewards</h1>
        <ol className="list-decimal list-inside ml-4 text-gray-700">
          {rules.map((rule, index) => (
            <li key={index} className="flex items-center gap-2 mb-2">
              <FaCheckCircle className="text-green-600 text-lg" />
              {rule}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default WayToEarnReward;
