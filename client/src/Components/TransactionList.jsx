import React, { useState, useEffect } from 'react';
import api from "../Utils/api"

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState("Newest to Oldest"); // default

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const result = await api.get('/transaction');
        setTransactions(result.data);
      } catch (err) {
        console.log('Fetch error:', err.message);
      }
    };
    getTransaction();
  }, []);

  let lastDate = null; // track the last displayed date

  // sort transactions based on selected sort order
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortOrder === "Newest to Oldest") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  return (
    <>
      <div className='flex justify-center items-center'>
        <h1 className='text-3xl font-medium mb-3 flex-1'>Transaction History</h1>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select w-40 mb-3"
        >
          <option>Newest to Oldest</option>
          <option>Oldest to Newest</option>
        </select>
      </div>

      <div className="w-full h-100 overflow-y-scroll border rounded-xl px-5 pb-5">
        {sortedTransactions.map((tx) => {
          const txDateOnly = new Date(tx.date).toISOString().split('T')[0];
          const showDate = txDateOnly !== lastDate;
          lastDate = txDateOnly;

          return (
            <div className="flex flex-col" key={tx._id}>
              {showDate && (
                <h1 className="text-white py-2 text-base font-medium mt-5 bg-amber-400 rounded-t-xl pl-2">
                  {new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  }).format(new Date(tx.date))}
                </h1>
              )}
              <div className='border-b-1 border-gray-800 pb-2'>
                <h2 className="text-white text-xs break-all pt-2">{`Transaction ID: ${tx._id}`}</h2>
                <div className="flex justify-between items-center text-base font-bold text-gray-50">
                  <div className="flex items-center text-base font-bold text-gray-50">
                    <h1 className={tx.type === 'Income' ? 'text-green-400 pr-1' : 'text-red-400 pr-1'}>{tx.type}</h1>
                    <h1>| {tx.category} </h1>
                  </div>
                  <h1 className={tx.type === 'Income' ? 'text-green-400' : 'text-red-400'}>
                    {tx.type === 'Income'
                      ? `+₱${parseFloat(tx.amount).toFixed(2)}`
                      : `-₱${parseFloat(tx.amount).toFixed(2)}`}
                  </h1>
                </div>
                <h3 className="text-gray-400 text-xs">{`Description: ${tx.description}`}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TransactionList;
