import React from 'react';
import { useGetRewardsQuery } from "../redux/slices/api/taskApiSlice.js";
import { FaBullseye, FaUsers } from 'react-icons/fa';

const MyReward = () => {
  const { data, isLoading } = useGetRewardsQuery();
  if (isLoading) return <div>Loading...</div>;
  const rewards = data || [];
  console.log(rewards);
  return (
    <div className="h-fit w-full p-4 bg-white shadow-lg rounded-lg overflow-y-auto flex flex-col justify-center items-center">
      <h1 className="text-center underline font-bold text-xl md:text-3xl mb-4">Your Rewards</h1>
      <div className="flex flex-col gap-6 w-full">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-green-100 shadow-md rounded-lg border border-gray-200 p-4 flex items-center justify-between hover:bg-green-200 transition-colors duration-200"
          >
            <div className="flex items-center gap-4">
              {reward.type === 'Goal' ? (
                <FaBullseye className="text-blue-600 text-2xl" />
              ) : (
                <FaUsers className="text-purple-600 text-2xl" />
              )}
              <div>
                <h2 className="text-lg font-bold mb-1 text-gray-900">{reward.name}</h2>
                <p className="text-gray-700">Reward: {reward.reward}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReward;
