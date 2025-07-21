import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const [clickSidePage, setClickSidePage] = useState('')

    const sideBar = [
        {label:'Dashboard', icon: <MdDashboard className=' my-auto ' size={30}/>, link:'/'},
        {label:'Add Transaction', icon: <IoIosAddCircle className=' my-auto ' size={30}/>, link:'/transaction'},
        {label:'History', icon: <RiChatHistoryFill className=' my-auto ' size={30}/>, link:'/history'},
        {label: 'Settings', icon:<IoMdSettings className=' my-auto' size={30}/>, link: '/setting' },
    ]

  return (
            <sidebar className='flex flex-col h-full w-70 border-r-1 '> 
            <h1 className='text-center font-medium text-3xl py-3.5'>Budgy</h1>
            {sideBar.map((item, index) => {
                return(
                <Link to={item.link}>
                    <div key={index}
                    className={`flex w-full px-4 py-3 gap-x-3  hover:bg-yellow-900 my-1 ${
                        clickSidePage === index
                        ? 'duration-200 hover:bg-yellow-950 bg-yellow-950'
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
                </Link>
                )
            })}

            <div className='flex w-full px-4 py-1 gap-x-3 hover:bg-yellow-900 mt-95'>
                <IoLogOutSharp className=' my-auto' size={30}/>
                <span className='text-md my-auto text-accent-content'>Logout</span>
            </div>
        </sidebar>
  )
}

export default Sidebar