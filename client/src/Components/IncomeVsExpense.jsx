import React, { useEffect } from 'react'
import { BarChart, CartesianGrid, Tooltip, Bar, XAxis, YAxis, Legend } from 'recharts'

const IncomeVsExpense = () => {

    const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300
  }
]

// useEffect(() => {
//   const Test = () =>{
//     const now = new Date();

// // Compute the first day of this week (Sunday)
// const firstDayOfWeek = new Date(now);
// firstDayOfWeek.setDate(now.getDate() - now.getDay()); // getDay() gives 0-6 (Sun-Sat)
// firstDayOfWeek.setHours(0,0,0,0); // reset time to midnight

// // Compute the last day of this week (Saturday)
// const lastDayOfWeek = new Date(firstDayOfWeek);
// lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
// lastDayOfWeek.setHours(23,59,59,999); // end of day

// console.log("Start of week:", firstDayOfWeek);
// console.log("End of week:", lastDayOfWeek);
//   }
//   Test()
// }, [])

  return (
    <div>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
    </div>
  )
}

export default IncomeVsExpense
