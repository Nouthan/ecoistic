import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaUser } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react"
import { getInitials } from "../utils";
import { logout } from '../redux/slices/authSlice';
import { useLogoutMutation } from "../redux/slices/api/authApiSlice"
const UserAvatar = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [logoutUser] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            navigate("/log-in");
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }
    return (
        <>
            <div>
                <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600">
                        <span className='text-white font-semibold'>
                            {getInitials(user?.name)}
                        </span>
                    </MenuButton>
                    <MenuItems
                        className="absolute right-0 mt-2 w-52 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none"
                    >
                        <div className='p-2'>
                            <MenuItem>
                                {(props) => (
                                    <button
                                        onClick={() => setOpen(true)}
                                        className={`${props.focus ? 'bg-blue-100' : ''
                                            } text-gray-700 flex w-full items-center rounded-md px-2 py-2 text-base`}
                                    >
                                        <FaUser className="mr-3" aria-hidden="true" />
                                        Profile
                                    </button>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {(props) => (
                                    <button
                                        onClick={logoutHandler}
                                        className={`${props.focus ? 'bg-blue-100' : ''
                                            } text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                                    >
                                        <IoLogOutOutline className="mr-2" aria-hidden="true" />
                                        Logout
                                    </button>
                                )}
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
            </div>

        </>
    )
}

export default UserAvatar
