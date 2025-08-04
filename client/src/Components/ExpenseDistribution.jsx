import React, { useEffect, useState } from 'react'
import {PieChart, Pie, Legend, Tooltip} from 'recharts'

const ExpenseDistribution = () => {

    const [expenseThisMonth, setExpenseThisMonth] = useState([])

    useEffect(() => {
        const getExpenseThisMonth = async () => {
            try{
                const result = await fetch("http://localhost:5050/api/expenses", {
                    method: 'GET'
                })
                const data = await result.json();
                setExpenseThisMonth(data)
            } catch (error){
                console.log("Error Message:", error)
            }  
        }
        getExpenseThisMonth()
    }, [])

  return (
    <PieChart width={730} height={350}>
    <Pie
    data={expenseThisMonth}
    dataKey="amount"
    nameKey="category"
    cx="50%"
    cy="50%"
    outerRadius={100}
    fill="#8884d8"
    label
    />
    <Legend verticalAlign="top" height={36}/>   
    <Tooltip />
    </PieChart>
  )
}

export default ExpenseDistribution