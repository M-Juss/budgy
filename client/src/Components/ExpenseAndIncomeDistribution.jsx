import React, { useEffect, useState } from 'react'
import {PieChart, Pie, Legend, Tooltip} from 'recharts'

const ExpenseDistribution = () => {

    const [expenseThisMonth, setExpenseThisMonth] = useState([])
    const [incomeThisMonth, setIncomeThisMonth] = useState([])

    useEffect(() => {
        const getExpenseThisMonth = async () => {
            try{
                const result = await fetch("http://localhost:5050/api/transaction/monthly_expense", {
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

    useEffect(() => {
        const getIncomeThisMonth = async () => {
            try{
                const result = await fetch("http://localhost:5050/api/transaction/monthly_income", {
                    method: "GET"
                })
                const data = await result.json()
                setIncomeThisMonth(data)
            } catch (error){
                console.log("Error Message:", error)
            } 
        }
        getIncomeThisMonth()
    }, [])

  return (
    <div className='flex space-x-10'>
        <div className='flex-1 flex-col'>
            <h1 className='text-3xl font-medium mb-3'>This Month Expense Distribution</h1>
                <div className='p-5 border-1 rounded-xl flex justify-center items-center'>
                    <PieChart width={400} height={300}>
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
                </div>
        </div>

        <div className='flex-1 flex-col'>
            <h1 className='text-3xl font-medium mb-3'>This Month Income Distribution</h1>
                <div className='p-5 border-1 rounded-xl flex justify-center items-center '>
                    <PieChart width={400} height={300}>
                        <Pie
                        data={incomeThisMonth}
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
                </div>
        </div>
    </div>

  )
}

export default ExpenseDistribution