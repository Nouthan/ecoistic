import React, { useState } from 'react';
import UserAction from '../components/Cards/UserAction.jsx';
import { FaBullseye } from 'react-icons/fa';
import { useUpdateItemStatusMutation } from '../redux/slices/api/taskApiSlice.js';

const ParticipatedGoalsOrAchievements = ({ items , refetch}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleActionClick = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const [updateItemStatus] = useUpdateItemStatusMutation();

  const handleStatusChange = async (status) => {
    try {
      await updateItemStatus({ itemId: selectedItem?.id, itemType: selectedItem?.type, }).unwrap();
      console.log(`Status updated to ${status}`);

    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };
  console.log(items);
  return (
    <div className="h-full w-full p-4 bg-gray-100 overflow-y-auto">
      <h1 className="text-center font-bold text-xl md:text-3xl mb-4 underline">Your Participations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white shadow-md p-4 rounded">
            <h2 className="text-lg font-bold text-center bg-teal-300 rounded-md px-4 py-2 text-white mb-2">{item.type}</h2>
            <div className="flex justify-between items-center">
              <h1 className="text-md font-bold">{item.name}</h1>
              <span className={`text-sm font-semibold ${item.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                {item.status === 'Completed' ? 'Completed' : 'In Progress'}
              </span>
            </div>
            <div className="flex flex-row justify-between gap-1 my-1">
              <div className="flex items-center gap-1 text-gray-700">
                <FaBullseye className="text-blue-500" />
                <p>{item.data}</p>
              </div>
              {item.reward && (
                <div className="flex items-center gap-1 text-gray-700">
                  <p>{item.reward}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => handleActionClick(item)}
              disabled={item.status === 'Completed'}
              className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:cursor-not-allowed disabled:bg-gray-300`}
            >
              Change Status
            </button>
          </div>
        ))}
      </div>
      <UserAction
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={(status) => handleStatusChange(status)}
      />
    </div>
  );
};

export default ParticipatedGoalsOrAchievements;
