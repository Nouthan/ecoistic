import React from 'react';
import { getInitials } from '../utils';
import { useGetAllUsersQuery } from "../redux/slices/api/userApiSlice.js"
const TopUsers = () => {
    const { data: users, isLoading, isError } = useGetAllUsersQuery();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading users</div>;


    return (
        <div className="h-full w-full p-4 bg-gray-100 overflow-y-auto">
            <h1 className="text-center font-bold text-xl md:text-3xl mb-4">Top Users</h1>
            <div className="flex flex-col gap-4">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg border border-gray-200 p-4 w-full flex items-center justify-between"
                    >
                        <div className="flex flex-row items-center justify-around gap-4">
                            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                                {getInitials(`${user.name} ${user.surname}`)}
                            </div>
                            <h2 className="text-lg font-bold mb-1 ml-4">{user.name} {user.surname}</h2>
                            <p className="text-gray-700 ml-8">Coins: {user.coins}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default TopUsers;
