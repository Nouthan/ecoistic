import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import { FcGoogle } from "react-icons/fc";
import { IoMdPersonAdd } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice.js"
import { googleLogin } from "../utils"
const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const result = await addNewUser({ ...data }).unwrap();
      navigate("/log-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <HomeNavbar />
      <div className="bg-gray-100 text-gray-900 flex justify-center md:w-full md:h-full top-1/2 left-1/2">
        <div className="m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}>
            </div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-3 sm:p-6 w-full">
            <div className="mt-1 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Sign up
              </h1>
              <div className="w-full flex-1 mt-3">
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xs">
                  <input
                    className='w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                    type='text'
                    placeholder='First Name'
                    {...register('name', { required: true })}
                  />
                  {errors.name && <p className='text-red-500 text-xs mt-1'>First name is required</p>}
                  <input
                    className='w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2'
                    type='text'
                    placeholder='Last Name'
                    {...register('surname', { required: true })}
                  />
                  {errors.surname && <p className='text-red-500 text-xs mt-1'>Last name is required</p>}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
                  <button
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <span className="ml-3">
                      Sign Up
                    </span>
                    <IoMdPersonAdd className='h-6 w-6 ml-2' />
                  </button>
                </form>
                <div className="my-3 border-b text-center">
                  <div
                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign up with e-mail
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button
                    onClick={googleLogin}
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-2">
                    <div className="bg-white p-2 rounded-full">
                      <FcGoogle className='h-6 w-6' />
                    </div>
                    <span className="ml-4">
                      Sign Up with Google
                    </span>
                  </button>

                  <button
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-2">
                    <div className="bg-white p-1 rounded-full">
                      <FaFacebook color='blue' className='h-6 w-6' />
                    </div>
                    <span className="ml-4">
                      Sign Up with Facebook
                    </span>
                  </button>
                </div>
              </div>
              <div className='mt-4 flex flex-col justify-center items-center'>
                <p className='underline'>Already have an account?</p>
                <Link to="/sign-in" className="mt-2 bg-indigo-500 text-white px-6 py-2 rounded-full">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Signup