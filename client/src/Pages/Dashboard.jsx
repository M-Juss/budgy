import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import TransactionList from '../Components/TransactionList'
import ExpenseAndIncomeDistribution from '../Components/ExpenseAndIncomeDistribution'
import IncomeVsExpense from '../Components/IncomeVsExpense'

const Dashboard = () => {

  return (
    <div className='flex h-screen w-screen overflow-x-hidden'>
        <Sidebar/>
        <div className='flex justify-center items-center p-10 h-full w-full '>
            <div className='h-full w-full'>
              <div className='flex flex-col pb-10 space-y-5'>
                <IncomeVsExpense/>
                <ExpenseAndIncomeDistribution/>
                <TransactionList/>
              </div>
              
            </div>
        </div>
    </div>
  )
}

export default Dashboard