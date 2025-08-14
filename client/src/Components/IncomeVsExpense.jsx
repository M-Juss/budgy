import React, { useEffect, useState } from 'react'
import { BarChart, CartesianGrid, Tooltip, Bar, XAxis, YAxis, Legend } from 'recharts'

const IncomeVsExpense = () => {

const [weeklyIncomeAndExpense, setWeeklyIncomeAndExpense] = useState([])

useEffect(() => {
  const getIncomeAndExpense = async () =>{
    try{
      const result = await fetch('http://localhost:5050/api/transaction/weekly_expense&income', {
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
    <div>
      <BarChart width={730} height={250} data={weeklyIncomeAndExpense}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#8884d8" />
        <Bar dataKey="expense" fill="#82ca9d" />
    </BarChart>
    </div>
  )
}

export default IncomeVsExpense
