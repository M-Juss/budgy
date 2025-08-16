import React, { useState } from 'react'
import TransactionList from '../Components/TransactionList'
import ExpenseAndIncomeDistribution from '../Components/ExpenseAndIncomeDistribution'
import IncomeVsExpense from '../Components/IncomeVsExpense'

const Dashboard = () => {

  return (
      <div className='flex flex-col pb-10 space-y-5'>
          <ExpenseAndIncomeDistribution/>
          <IncomeVsExpense/>
      </div>
  )
}

export default Dashboard