import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  // watch password for confirmPassword validation
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    reset(); // clear form after submit
    alert("Signup successful!");
  };

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <div className='flex flex-col h-fit w-110 md:w-130 border-1 rounded-xl  px-7 py-7 space-y-5'>
        
        {/* Header */}
        <div className='flex flex-col'>
          <h1 className='text-center font-bold text-4xl md:text-3xl'>BUDGY</h1>
          <span className='text-md text-center text-lg md:text-md'>
            Control your money, don’t let it control you.
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          {/* Username */}
          <div>
            <label className="input w-full h-12">
              <FaUserAlt /> 
              <input
                type="text"
                placeholder="Username"
                className='font-semibold'
                {...register("username", {
                  required: 'Username is required.',
                  pattern: {
                    value: /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/,
                    message: "Username must be 3–16 characters, start with a letter, and use only letters, numbers, . or _."
                  }
                })}
              /> 
            </label>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="input w-full">
              <MdEmail />
              <input 
                type="email" 
                placeholder="mail@site.com" 
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email (e.g. user@example.com)"
                  }
                })}  
              />
            </label>
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="input w-full h-12">
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className='font-semibold flex-1'
                {...register("password", {
                  required: "Password is required.",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
                    message: "Password must be 6–20 characters, include letters and numbers."
                  }
                })}
              />
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="input w-full h-12">
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className='font-semibold flex-1'
                {...register("confirmPassword", {
                  required: "Please confirm your password.",
                  validate: (value) => value === password || "Passwords do not match." // gets the confirmPassword value the match it in password watch
                })}
              />
            </label>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Show Password Toggle */}
          <div onClick={togglePassword} className='flex space-x-1 items-center text-md cursor-pointer'>
            {showPassword ? <MdCheckBox size={20}/> : <MdCheckBoxOutlineBlank size={20}/>}
            <span>Show Password</span>
          </div>

          {/* Signup Button */}
          <button type="submit" className="btn btn-default">Sign up</button>

          {/* Redirect */}
          <div className='flex space-x-1 justify-center'>
            <span className='text-md md:text-sm'>Already have an account?</span>
            <span className='hover:underline cursor-pointer text-md md:text-sm'>
              <Link to="/login">Log in</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
