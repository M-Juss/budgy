import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../Components/Sidebar';
import { FaPesoSign } from "react-icons/fa6";

const Transaction = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const type = watch('type'); // Watch the type field

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    reset();
  };

  const incomeCategories = [
    'Salary', 'Freelance', 'Allowance', 'Bonus', 'Business', 'Investment', 'Gift', 'Others (Income)'
  ];

  const expenseCategories = [
    'Food & Groceries', 'Transportation', 'Rent', 'Utilities', 'Health & Medicine', 'Education',
    'Shopping', 'Entertainment', 'Travel', 'Subscriptions', 'Loan Payment', 'Insurance', 'Pets',
    'Donations', 'Savings', 'Others (Expense)'
  ];

  const categories = type === 'Income' ? incomeCategories : type === 'Expense' ? expenseCategories : [];

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      <Sidebar />
      <div className='flex justify-center items-center p-10 h-full w-full'>
        <div className='h-full w-full'>
          <h1 className='text-3xl font-medium'>Add Transaction</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid grid-cols-2 gap-y-5 w-full pt-5'
          >
            {/* Amount Input */}
            <div className="mr-4 w-full">
              <label className="input validator w-full flex items-center gap-2">
                <FaPesoSign size={20} className="opacity-50" />
                <input
                  type="text"
                  placeholder="Amount"
                  className="grow"
                  {...register("amount", {
                    required: "Amount is required",
                    pattern: {
                      value: /^[0-9]+(\.[0-9]{1,2})?$/,
                      message: "Only numbers allowed (max 2 decimal places)"
                    }
                  })}
                />
              </label>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Type Select */}
            <div className='ml-4'>
              <select
                defaultValue=""
                {...register('type', { required: 'Transaction type is required' })}
                className="select w-full"
              >
                <option value="" disabled>What type of transaction</option>
                <option>Income</option>
                <option>Expense</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>

            {/* Dynamic Category Select */}
            <div className='mr-4'>
              <select
                defaultValue=""
                disabled={!type}
                {...register('category', {
                  required: 'Category is required'
                })}
                className={`select w-full ${!type ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="" disabled>
                  {type ? 'Select category' : 'Select transaction type first'}
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category.message}</p>
              )}
            </div>

            {/* Date Picker */}
            <div className='ml-4'>
              <input
                type="date"
                {...register('date', { required: 'Date is required' })}
                className="input w-full"
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </div>

            {/* Description */}
            <div className='col-span-2'>
              <textarea
                {...register('description')}
                className="textarea w-full"
                placeholder="Description"
              ></textarea>
            </div>

            {/* Submit */}
            <div className='col-span-1 w-30'>
              <button
                type="submit"
                className='font-medium w-full text-black bg-[#dd9f42] py-2 rounded-xl hover:bg-[#dd9f42dc]'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
