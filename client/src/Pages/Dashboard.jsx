import React from 'react'
import { BiMenu } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";

const Dashboard = () => {
  return (
    <div className='flex h-screen w-screen overflow-hidden'>
        
        <sidebar className='flex flex-col h-full w-70 border-r-1 '> 
            <h1 className='text-center font-medium text-3xl py-3.5'>Budgy</h1>
            <div className='flex w-full px-4 py-3 gap-x-3  hover:bg-slate-900 my-1'>
                <MdDashboard className=' my-auto ' size={30}/>
                <span className='text-md my-auto text-accent-content'>Dashboard</span>
            </div>
            <div className='flex w-full px-4 py-3 gap-x-3  hover:bg-slate-900 my-1'>
                <IoIosAddCircle className=' my-auto ' size={30}/>
                <span className='text-md my-auto text-accent-content'>Add Transaction </span>
            </div>
            <div className='flex w-full px-4 py-3 gap-x-3  hover:bg-slate-900 my-1'>
                <RiChatHistoryFill className=' my-auto ' size={30}/>
                <span className='text-md my-auto text-accent-content'>History</span>
            </div>
            <div className='flex w-full px-4 py-3 gap-x-3  hover:bg-slate-900 my-1'>
                <IoMdSettings className=' my-auto ' size={30}/>
                <span className='text-md my-auto text-accent-content'>Settings</span>
            </div>

            <div className='flex w-full px-4 py-1 gap-x-3 hover:bg-slate-900 mt-95'>
                <IoLogOutSharp className=' my-auto' size={30}/>
                <span className='text-md my-auto text-accent-content'>Logout</span>
            </div>
        
        </sidebar>

        <div className='flex justify-center items-center p-10 h-full w-full'>
            <div className='h-full w-full'></div>
        </div>
    </div>
  )
}

export default Dashboard