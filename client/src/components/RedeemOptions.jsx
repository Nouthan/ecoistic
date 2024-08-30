import React from 'react';
import { FaGift, FaDonate, FaLeaf } from 'react-icons/fa';

const RedeemOptions = () => {
  return (
    <div className="h-full w-full p-4 bg-white shadow-lg rounded-lg overflow-y-auto flex flex-col justify-center items-center">
      <h1 className="text-center underline font-bold text-xl md:text-3xl mb-4">Redeem Options</h1>
      <div className="flex flex-col gap-6 w-full">
        <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-start gap-4 hover:bg-green-200 transition-colors duration-200">
          <FaGift className="text-blue-600 text-2xl" />
          <div>
            <h2 className="text-lg font-bold mb-2 text-gray-900">Discounts</h2>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>Energy Efficiency Products</li>
              <li>Sustainable Brands</li>
            </ul>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-start gap-4 hover:bg-green-200 transition-colors duration-200">
          <FaDonate className="text-purple-600 text-2xl" />
          <div>
            <h2 className="text-lg font-bold mb-2 text-gray-900">Donations</h2>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>Environmental Charities</li>
              <li>Tree Plantations</li>
            </ul>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-start gap-4 hover:bg-green-200 transition-colors duration-200">
          <FaLeaf className="text-green-600 text-2xl" />
          <div>
            <h2 className="text-lg font-bold mb-2 text-gray-900">Ecoistic</h2>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>Personalized Consultations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemOptions;
