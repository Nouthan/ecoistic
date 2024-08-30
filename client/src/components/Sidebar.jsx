import React from 'react'
import { MdDashboard, MdEnergySavingsLeaf} from "react-icons/md"
import { RiCoinsLine, RiCommunityLine } from "react-icons/ri";
import { GiBullseye } from "react-icons/gi";
import { FaPersonRifle } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom"
import { setOpenSidebar } from '../redux/slices/authSlice';
import clsx from "clsx"

const linkData = [
    {
        label: "Dashboard",
        link: "dashboard",
        icon: <MdDashboard  className='h-6 w-6'/>,
    },
    {
        label: "Goal Setting",
        link: "goals",
        icon: <GiBullseye className='h-6 w-6' />,
    },    
    {
        label: "Community",
        link: "community",
        icon: <RiCommunityLine className='h-6 w-6'/>,
    },
    {
        label: "Rewards",
        link: "rewards",
        icon: <RiCoinsLine  className='h-6 w-6'/>,
    },{
        label: "Participation",
        link: "participation",
        icon: <FaPersonRifle className='h-6 w-6'/>
    }
];

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);
    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    }
    const NavLink = ({ elem }) => {
        return (
            <Link
                to={elem.link}
                onClick={closeSidebar}
                className={clsx("w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]", path == elem.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : "")}
            >
                {elem.icon}
                <span className='hover:text-[#2564ed]'>{elem.label}</span>
            </Link>
        )
    }
    return (
        <div className='w-full h-full flex flex-col gap-6 p-5'>
            <div className='flex flex-row items-center justify-begin gap-2 text-2xl font-bold text-black '>
                <MdEnergySavingsLeaf color='#5f9607'/>
                ECOistic
            </div>
            <div className='flex-1 flex flex-col gap-y-5 py-8'>
                {sidebarLinks.map((link) => (
                    <NavLink elem={link} key={link.label} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
