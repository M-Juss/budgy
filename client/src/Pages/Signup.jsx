import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Link } from 'react-router-dom';


const Signup = () => {
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

          <label className="input  w-full">
            <MdEmail/>
            <input 
            type="email" 
            placeholder="mail@site.com" 
            required />
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
          </label>

          <label className="input w-full h-12 ">
            <FaLock/>
            <input
              type={showPassword ? "text": "password"}
              required
              placeholder="Confirm Password"
              className='font-semibold flex-1'
            />
          </label>
          <div onClick={togglePassword} className='flex space-x-1 items-center text-md cursor-pointer'>
            {showPassword ? <MdCheckBox size={20}/> : <MdCheckBoxOutlineBlank size={20}/>}
            <span>Show Password</span>
          </div>
          {/* Login Button */}
          <button className="btn btn-default">Sign up</button>

          {/* Signup Redirect */}
          <div className='flex space-x-1 justify-center '>
            <span className='text-md md:text-sm'>Already have an account?</span>
            <span className='hover:underline cursor-pointer text-md md:text-sm'><Link to=""></Link>Log in</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup