import React, { useRef } from "react";
import HomeNavbar from "../components/HomeNavbar.jsx";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import AboutUs from "../components/AboutUs.jsx";
import { useSelector } from "react-redux";

const Home = () => {
  const {user} = useSelector((state) => state.auth);
  const aboutUsRef = useRef(null);

  const scrollToAboutUs = () => {
    aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <HomeNavbar scrollToAboutUs={scrollToAboutUs} />
      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col justify-center items-center h-screen -mb-10">
          <div className="flex flex-col gap-3 justify-center items-center">
            <h1 className="text-5xl text-center font-bold w-[60%]">Get started with ECOistic - Your path to Personalized energy savings.</h1>
            <p className="mt-4 text-xl w-[58%] ml-10">Stop wasting energy. Start saving with ECOistic! We analyze your habits and home to create a personalized plan for reducing your energy consumption. Save money on your bills while creating a more sustainable future. Join ECOistic and unlock.</p>
            { !user && <Link to="/sign-up" className="mt-12 flex flex-row bg-blue-500 text-white px-7 py-2 rounded-full">Sign Up Now <span className="ml-1 my-auto"><MdKeyboardArrowRight size={20}/></span></Link>}
          </div>
        </div>
        <div className="bg-gray-200" ref={aboutUsRef}>
          <AboutUs />
        </div>
      </div>
    </div>
  );
};

export default Home;
