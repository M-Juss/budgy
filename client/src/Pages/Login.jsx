import React, { useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log("Login data:", data);
    try{
      const response = await fetch("http://localhost:5050/api/login", {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data)
      })
        const result = response.json()
        
        if(!response.ok){
        alert("Login failed!");
        return;
        }

        localStorage.setItem("token", result.token);
        reset();
        alert("Login successful!");
        navigate("/dashboard");

    }catch(error){
      console.error("Internal service error: ", error)
    }
  };

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <div className='flex flex-col h-fit w-110 md:w-130 border-1 rounded-xl px-7 py-7 space-y-5'>
        
        {/* Header */}
        <div className='flex flex-col'>
          <h1 className='text-center font-bold text-4xl md:text-3xl'>BUDGY</h1>
          <span className='text-md text-center text-lg md:text-md'>
            Control your money, don’t let it control you.
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5'>
          {/* Username */}
          <div>
            <label className="input w-full h-12">
              <FaUserAlt/> 
              <input
                type="text"
                placeholder="Email"
                className='font-semibold'
                {...register("email", {
                  required: "Email is required.",
                })}
              /> 
            </label>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="input w-full h-12">
              <FaLock/>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className='font-semibold flex-1'
                {...register("password", {
                  required: "Password is required.",
                  // minLength: {
                  //   value: 6,
                  //   message: "Password must be at least 6 characters."
                  // }
                })}
              />
              <span 
                onClick={togglePassword}
                className='cursor-pointer'
              >
                {showPassword ? <LuEye size={20}/> : <LuEyeClosed size={20}/>}
              </span>
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-default">Log in</button>

          {/* Signup Redirect */}
          <div className='flex space-x-1 justify-center'>
            <span className='text-md md:text-sm'>Don't have an account?</span>
            <span className='hover:underline cursor-pointer text-md md:text-sm'>
              <Link to='/signup'>Sign up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
