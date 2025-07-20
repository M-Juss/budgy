import React, { useState } from 'react'
import { BiMenu } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";

const Dashboard = () => {
    
    const [clickSidePage, setClickSidePage] = useState('')

    const sideBar = [
        {label:'Dashboard', icon: <MdDashboard className=' my-auto ' size={30}/>},
        {label:'Add Transaction', icon: <IoIosAddCircle className=' my-auto ' size={30}/>},
        {label:'History', icon: <RiChatHistoryFill className=' my-auto ' size={30}/>},
        {label: 'Settings', icon:<IoMdSettings className=' my-auto' size={30}/> },
    ]
    

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
        
        <sidebar className='flex flex-col h-full w-70 border-r-1 '> 
            <h1 className='text-center font-medium text-3xl py-3.5'>Budgy</h1>

            {sideBar.map((item, index) => {
                return(
                    <div key={index}
                    className={`flex w-full px-4 py-3 gap-x-3  hover:bg-yellow-900 my-1 ${
                        clickSidePage === index
                        ? 'hover:bg-yellow-950 bg-yellow-950'
                        : ''
                        }`}
                    onClick={() => (setClickSidePage(index))} >
                    {clickSidePage === index && (
                    <>
                        <div className=' absolute left-0 h-8 w-1 bg-white'></div>
                    </>)}
                    <span>{item.icon}</span>
                    <span className='text-md my-auto text-accent-content'>{item.label}</span>
                    
            </div>
                )
            })}

            <div className='flex w-full px-4 py-1 gap-x-3 hover:bg-yellow-900 mt-95'>
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