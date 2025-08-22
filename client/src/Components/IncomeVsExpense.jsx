import React, { useEffect, useState } from 'react'
import { BarChart, CartesianGrid, Tooltip, Bar, XAxis, YAxis, Legend } from 'recharts'

const IncomeVsExpense = () => {

const [weeklyIncomeAndExpense, setWeeklyIncomeAndExpense] = useState([])

useEffect(() => {
  const getIncomeAndExpense = async () =>{
    try{
      const result = await fetch('http://localhost:5050/api/transaction/weekly_expense_income', {
        method: 'GET'
      })
      const data = await result.json()
      setWeeklyIncomeAndExpense(data)
    } catch(error) {
      console.error(`Error message: ${error}`)
    }

}
  getIncomeAndExpense()
}, [])

  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl font-medium mb-3'>
        Weekly Income VS. Expense Projections
      </h1>
      <div className='flex justify-center items-center border-1 py-10 rounded-xl'>
        <BarChart width={1000} height={300} data={weeklyIncomeAndExpense}>
          <CartesianGrid strokeDasharray="4 1" fill='' />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#8884d8" />
          <Bar dataKey="expense" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>

  )
}

export default IncomeVsExpense
