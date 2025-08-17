import React, { useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link } from 'react-router-dom';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword((prev) => !prev)
    }
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <div className='flex flex-col h-fit w-110 md:w-130 border-1 rounded-xl  px-7 py-7 space-y-5'>
        
        <div className='flex flex-col'>
          <h1 className='text-center font-bold text-4xl md:text-3xl '>BUDGY</h1>
          <span className='text-md text-center text-lg md:text-md'>Control your money, don’t let it control you.</span>
        </div>

        <div className='flex flex-col space-y-5'>
          {/* Username */}
          <label className="input w-full h-12">
            <FaUserAlt/> 
            <input
              type="text"
              required 
              placeholder="Username"
              className='font-semibold'
            /> 
          </label>

          {/* Password */}
          <label className="input w-full h-12 ">
            <FaLock/>
            <input
              type={showPassword ? "text": "password"}
              required
              placeholder="Password"
              className='font-semibold flex-1'
            />
            <span 
            onClick={togglePassword}
            className='cursor-pointer'>
            {showPassword ? <LuEye size={20}/> : <LuEyeClosed size={20}/>}
            </span>
          </label>

          {/* Login Button */}
          <button className="btn btn-default">Log in</button>

          {/* Signup Redirect */}
          <div className='flex space-x-1 justify-center '>
            <span className='text-md md:text-sm'>Don't have an account?</span>
            <span className='hover:underline cursor-pointer text-md md:text-sm'><Link to='/signup'>Sign up</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
