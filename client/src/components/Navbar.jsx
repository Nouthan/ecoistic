import React, { useState } from 'react'
import { MdOutlineSearch } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import UserAvatar from "./UserAvatar"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
const Navbar = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    return (
        <div className='flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0 gap-1'>
            <div className='flex gap-4 md:gap-10'>
                <button
                    onClick={() => dispatch(setOpenSidebar(true))}
                    className='text-2xl text-gray-500 block md:hidden'
                >
                    <IoMenu size={27} className='text-gray-700' />
                </button>

                <div className='w-[60%] md:w-[80%] 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
                    <MdOutlineSearch className='text-gray-500 text-xl' />

                    <input
                        type='text'
                        placeholder='Search....'
                        className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
                    />
                </div>
                <Link
                    to="/home"
                    className={`nav-item ${location.pathname === '/' ? 'active' : ''} p-2 rounded-lg bg-gray-200 -ml-2`}
                >
                    Home
                </Link>
            </div>
            <div className='flex gap-2 items-center'>
                <UserAvatar />
            </div>
        </div>
    )
}

export default Navbar
