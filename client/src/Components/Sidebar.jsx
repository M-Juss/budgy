import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
 import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation()
    const sideBar = [
        {label:'Dashboard', icon: <MdDashboard className=' my-auto ' size={30}/>, link:'/dashboard'},
        {label:'Add Transaction', icon: <IoIosAddCircle className=' my-auto ' size={30}/>, link:'/transaction'},
        {label:'History', icon: <RiChatHistoryFill className=' my-auto ' size={30}/>, link:'/history'},
        {label: 'Settings', icon:<IoMdSettings className=' my-auto' size={30}/>, link: '/settings' },
    ]

  return (
        <aside className='flex flex-col w-[250px] h-screen sticky top-0 border-r-1 '> 
            <h1 className='text-center font-medium text-3xl py-3.5'>Budgy</h1>
            <div className="flex-1">
                {sideBar.map((item, index) => {
                    const isActive = location.pathname == item.link
                    return(
                        <Link to={item.link} key={index}>
                        <div
                        className={`flex w-full px-4 py-3 gap-x-3  hover:bg-yellow-900 my-1 ${
                            isActive
                            ? 'duration-200 hover:bg-yellow-950 bg-yellow-950'
                            : ''
                            }`}
                        >
                        {isActive && (
                        <>
                            <div className=' absolute left-0 h-8 w-1 bg-white'></div>
                        </>)}
                        <span>{item.icon}</span>
                        <span className='text-md my-auto text-accent-content'>{item.label}</span>
                        </div>
                        </Link>
                    )
                })}
            </div>
            <div className='flex w-full px-4 py-1 gap-x-3 hover:bg-yellow-900'>
                <IoLogOutSharp className=' my-auto' size={30}/>
                <span className='text-md my-auto text-accent-content'>Logout</span>
            </div>
        </aside>
  )
}

export default Sidebar