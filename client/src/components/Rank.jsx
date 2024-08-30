import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getInitials } from '../utils';
import { useGetAllUsersQuery } from "../redux/slices/api/userApiSlice.js"

const TrackPosition = () => {
  const { data: users, isLoading, isError } = useGetAllUsersQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;


  const data = users.map(user => ({
    ...user,
    initials: getInitials(`${user.name} ${user.surname}`)
  }));

  return (
    <div className="h-full w-full p-4 bg-gray-100 overflow-y-auto">
      <h1 className="text-center font-bold text-xl md:text-3xl mb-4">Track Your Position</h1>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="initials" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="coins" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TrackPosition;
