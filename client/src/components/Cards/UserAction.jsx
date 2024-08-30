import React from 'react';
import { FaQuestion } from 'react-icons/fa';
import clsx from 'clsx';
import Button from './Button'; 
import DialogWrapper from './DialogWrapper';

const UserAction = ({ open, setOpen, onClick }) => {
  const closeDialog = () => {
    setOpen(false);
  };

  const handleConfirm = (status) => {
    onClick(status);
    closeDialog();
  };

  return (
    <DialogWrapper open={open} setOpen={closeDialog}>
      <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
        <p className={clsx("P-3 rounded-full", "text-red-600 bg-red-200")}><FaQuestion size={60} /></p>
        <p className='text-center text-gray-500'>
          {"Are you sure you want to change the status of this item?"}
        </p>
      </div>
      <div className='flex flex-row gap-4 justify-end'>
        <Button
          type="button"
          className="px-8 text-sm font-semibold text-white sm:w-auto bg-red-600 hover:bg-red-500 rounded-md"
          onClick={() => handleConfirm('completed')}
          label="Mark as Completed"
        />
        <Button
          type="button"
          className='bg-slate-100 px-8 text-sm font-semibold text-gray-900 sm:w-auto border rounded-md'
          onClick={() => handleConfirm('pending')}
          label="Mark as Pending"
        />
        <Button
          type='button'
          className='bg-slate-100 px-8 text-sm font-semibold text-gray-900 sm:w-auto border rounded-md'
          onClick={() => closeDialog()}
          label='Cancel'
        />
      </div>
    </DialogWrapper>
  );
};

export default UserAction;
