import React from 'react';
import ParticipatedGoalsOrAchievements from '../components/participation.jsx';
import { useGetAllTasksQuery } from "../redux/slices/api/taskApiSlice.js"

const AllParticipation = () => {
  const {data, isLoading, refetch} = useGetAllTasksQuery();
  if(isLoading) return <div>Loading...</div>;

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-200">
      <ParticipatedGoalsOrAchievements items={data.tasks} refetch={refetch}/>
    </div>
  );
};

export default AllParticipation;
