import React from 'react';
import MyReward from '../components/MyReward';
import WayToEarnReward from '../components/EarnReward';
import RedeemOptions from '../components/RedeemOptions';

const Rewards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen gap-2">
      <div className="overflow-y-auto">
        <MyReward />
      </div>
      <div className="grid grid-rows-2 gap-0">
        <div className="overflow-y-auto">
          <RedeemOptions />
        </div>
        <div className="overflow-y-auto">
          <WayToEarnReward />
        </div>
      </div>
    </div>
  );
};

export default Rewards;
