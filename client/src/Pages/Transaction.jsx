import React from 'react'
import Sidebar from '../Components/Sidebar'
import { FaPesoSign } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";

const Transaction = () => {
  return (

    <div className='flex h-screen w-screen overflow-hidden'>
        <Sidebar/>
        <div className='flex justify-center items-center p-10 h-full w-full'>
            <div className='h-full w-full'>
            <h1 className='text-3xl font-medium'>Add Transaction</h1>
              <div className='flex flex-col gap-y-2 w-80 py-5 ' >
                <div className='w-full'>
                  <label className="input validator">
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <FaPesoSign size={25}/>
                  </svg>
                  <input
                    type="text"
                    required
                    placeholder=""
                    pattern="[0-9,.]*"
                    minlength="1"
                    maxlength="30"
                    title="Only real numbers"
                  />
                </label>
                <p className="validator-hint relative top-0">
                  Real numbers only
                </p>
                </div>

                <div className='pb-6.5 w-full'>
                 <select defaultValue='What type of transaction?' className="select ">
                  <option disabled={true}>What type of transaction</option>
                  <option>Income</option>
                  <option>Expense</option>
                </select>
                </div>

                <div className='pb-6.5 w-full'>
                 <select defaultValue='In what category?' className="select ">
                  <option disabled={true}>In what category</option>
                  <option>Savings</option>
                  <option>Transportation</option>
                </select>
                </div>

                <div className='pb-6.5 w-full'>
                  <input type="date" className="input" />
                </div>

                <div className='pb-6.5 w-full'>
                  <textarea class="textarea" placeholder="Description"></textarea>
                </div>

                <button>Submit  </button>
              </div>

            </div>
        </div>
    </div>
  )
}

export default Transaction