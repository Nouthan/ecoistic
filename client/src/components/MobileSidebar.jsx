import React from 'react'
import { IoClose } from "react-icons/io5";
// import { useDispatch, useSelector } from 'react-redux'
// import { setOpenSidebar } from '../redux/slices/authSlice';
import { Transition } from '@headlessui/react'
import Sidebar from "./Sidebar"
import { Fragment, useRef } from "react";
import clsx from 'clsx';

const MobileSidebar = () => {
    // const { isSidebarOpen } = useSelector((state) => state.auth);
    const isSidebarOpen = true;
    const mobileMenuRef = useRef(null);
    // const dispatch = useDispatch();

    const closeSidebar = () => {
    //     dispatch(setOpenSidebar(false));
    };

    return (
        <Transition
            show={isSidebarOpen}
            as={Fragment}
            enter='transition-opacity duration-500'
            enterFrom='opacity-x-10'
            enterTo='opacity-x-100'
            leave='transition-opacity duration-200'
            leaveFrom='opacity-x-100'
            leaveTo='opacity-x-0'
        >
            {(ref) => (
                <div
                    ref={(node) => (mobileMenuRef.current = node)}
                    className={clsx(
                        "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform",
                        isSidebarOpen ? "translate-x-0" : "translate-x-full"
                    )}
                    onClick={() => closeSidebar()}
                >
                    <div className='bg-white w-3/4 h-full'>
                        <div className='w-full flex justify-end px-5 mt-5'>
                            <button
                                onClick={() => closeSidebar()}
                                className='flex justify-end items-end'
                            >
                                <IoClose size={25} />
                            </button>
                        </div>

                        <div className='-mt-10'>
                            <Sidebar />
                        </div>
                    </div>
                </div>
            )}
        </Transition>
    );
};

export default MobileSidebar
