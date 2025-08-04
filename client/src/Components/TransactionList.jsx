import React, { useState, useEffect } from 'react';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const result = await fetch('http://localhost:5050/api/transaction', {
          method: 'GET',
        });
        const data = await result.json(); // <-- fixed with await
        setTransactions(data);
      } catch (err) {
        console.log('Fetch error:', err.message);
      }
    };
    getTransaction();
  }, []);

let lastDate = null; // track the last displayed date outside the map

return (
  <div className="w-full h-80 overflow-y-scroll border rounded-xl px-5 pb-5">
    {transactions.map((tx) => {
      const showDate = tx.date !== lastDate;
      lastDate = tx.date; 

      return (
        <div className="flex flex-col " key={tx._id}>
          {showDate && (
            <h1 className="text-white py-2 text-base font-medium mt-5 bg-amber-400 rounded-t-xl pl-2">
                {new Intl.DateTimeFormat('en-US', {
                day: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                }).format(new Date(tx.date))}
            </h1>
          )}
          <div className=' border-b-1 border-gray-800 pb-2'>
            <h2 className="text-white text-xs break-all pt-2">{`Transaction ID: ${tx._id}`}</h2>
            <div className="flex justify-between items-center text-base font-bold text-gray-50">
              <div className="flex items-center text-base font-bold text-gray-50">
                <h1 className={tx.type === 'Income' ? 'text-green-400 pr-1' : 'text-red-400 pr-1'}>{tx.type}</h1>
                <h1>| {tx.category} |</h1>
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
);

};

export default TransactionList;
