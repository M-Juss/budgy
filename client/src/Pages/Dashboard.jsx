import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'

const Dashboard = () => {

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
        <Sidebar/>
        <div className='flex justify-center items-center p-10 h-full w-full '>
            <div className='h-full w-full'>
              <h1>Dashboard</h1>
            </div>
        </div>
    </div>
  )
}

export default Dashboard