import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";

const HomeNavbar = ({ scrollToAboutUs }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    return (
        <nav className="w-full flex justify-around items-center bg-white px-4 py-5 sticky z-10 top-0">
            <span className='text-2xl font-bold text-black'>ECOistic</span>
            <ul className="flex space-x-7">
                <li>
                    <Link
                        to="/"
                        className={`nav-item ${location.pathname === '/' ? 'active' : ''} p-2 rounded-lg bg-gray-200`}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/"
                        onClick={scrollToAboutUs}
                        className={`nav-item ${location.pathname === '/about' ? 'active' : ''} p-2 rounded-lg bg-gray-200`}
                    >
                        About Us
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''} p-2 rounded-lg bg-gray-200`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/rewards"
                        className={`nav-item ${location.pathname === '/reward' ? 'active' : ''} p-2 rounded-lg bg-gray-200`}
                    >
                        Reward
                    </Link>
                </li>
            </ul>
            {!user && <Link to="/log-in" className="btn bg-blue-500 text-white px-4 py-2 rounded">Log in</Link>}
        </nav>
    )
}

export default HomeNavbar