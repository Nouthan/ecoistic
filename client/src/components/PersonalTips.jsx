import React from 'react';
import TipCard from '../components/Cards/Tip.jsx';

const PersonalizedTips = ({ tips }) => {
  return (
    <div className='border-2 border-black p-2 rounded-md'>
      <h2 className="text-lg md:text-xl font-bold text-center border-b-2 border-gray-400">Personal Tips</h2>
      {tips.map((tip, index) => (
        <TipCard key={index} tip={tip} />
      ))}
    </div>
  );
};

export default PersonalizedTips;
