import React from 'react';
import { useGetAllCommunitiesQuery, useAddUserToCommunityMutation } from '../redux/slices/api/taskApiSlice';
import { useSelector, useDispatch } from 'react-redux';

const AllCommunities = () => {
  const { data, isLoading, isError } = useGetAllCommunitiesQuery();
  const [addUserToCommunity, { isLoading: isAdding }] = useAddUserToCommunityMutation();
  const user = useSelector((state) => state.auth.user);
  const userCommunityIds = user?.communityIds || [];
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading communities</div>;

  const communities = data?.formattedCommunities || [];
  
  const handleAddCommunity = async (communityId) => {
    try {
      await addUserToCommunity(communityId).unwrap();
      console.log(`Community with id ${communityId} added.`);
    } catch (error) {
      console.error('Failed to add user to community:', error);
    }
  };

  return (
    <div className="h-full w-full p-4 bg-gray-100 overflow-y-auto">
      <h1 className="text-center font-bold text-xl md:text-3xl mb-4">All Communities</h1>
      <div className="flex flex-col gap-4">
        {communities.map((community) => {
          const isMember = userCommunityIds.includes(community.id);
          return (
            <div
              key={community.id}
              className="bg-white shadow-md rounded-lg border border-gray-200 p-4 w-full flex flex-col justify-between"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-bold mb-2">{community.name}</h2>
                  <p className="text-gray-700">Target: {community.target}</p>
                  <p className="text-gray-700">Total Members: {community.members}</p>
                </div>
                <div>
                  <p className="text-gray-700 font-bold">Reward: {community.reward}</p>
                </div>
              </div>
              <button
                onClick={() => handleAddCommunity(community.id)}
                className={`rounded-md px-4 py-2 mt-4 ${isMember ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
                disabled={isMember || isAdding}
              >
                {isMember ? 'ADDED' : 'Add'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCommunities;
