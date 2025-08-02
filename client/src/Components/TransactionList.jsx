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
  <div className="w-full h-80 overflow-y-scroll border rounded-xl px-5 py-3">
    {transactions.map((tx) => {
      const showDate = tx.date !== lastDate;
      lastDate = tx.date; // update tracker

      return (
        <div className="flex flex-col py-2 border-b border-gray-700" key={tx._id}>
          {showDate && (
            <h1 className="text-amber-400 text-base font-medium mb-1">
                {new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                }).format(new Date(tx.date))}
            </h1>
          )}
          <h2 className="text-gray-400 text-xs break-all">{tx._id}</h2>
          <div className="flex justify-between items-center text-base font-bold text-gray-50">
            <div className="flex items-center text-base font-bold text-gray-50">
              <h1 className="pr-5">{tx.type}</h1>
              <h1>| {tx.category} |</h1>
            </div>
            <h1 className={tx.type === 'Income' ? 'text-green-400' : 'text-red-400'}>
              {tx.type === 'Income' 
                ? `+₱${parseFloat(tx.amount).toFixed(2)}`
                : `-₱${parseFloat(tx.amount).toFixed(2)}`}
            </h1>
          </div>
          <h3 className="text-gray-400 text-xs">{tx.description}</h3>
        </div>
      );
    })}
  </div>
);

};

export default TransactionList;
