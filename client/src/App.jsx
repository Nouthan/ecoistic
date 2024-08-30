import React from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx"
import Dashboard from "./pages/Dashboad.jsx"
import Goals from "./pages/Goals.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Reward from "./pages/Rewards.jsx"
import Community from "./pages/Community.jsx"
import MobileSidebar from "./components/MobileSidebar.jsx";
import Home from "./pages/Home.jsx";
import { useSelector } from 'react-redux'
import AllParticipation from "./pages/AllParticipation.jsx"
function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-[250px] h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>
      <MobileSidebar />
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/home" state={{ from: location }} replace />
  );
}

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/rewards" element={<Reward />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/participation" element={<AllParticipation />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
