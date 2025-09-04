// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Transaction from './Pages/Transaction'
import History from './Pages/History'
import Settings from './Pages/Settings'
import Sidebar from './Components/Sidebar'
import { useState } from 'react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  const [transactionSuccessful, setTransactionSuccessful] = useState();

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Signup/>}/>

      <Route
        path='/*' 
        element={
        <div className='flex h-screen w-screen overflow-x-hidden'>
          <Sidebar />
          <div className='flex justify-center items-center p-10 h-full w-full'>
            <div className='h-full w-full'>
              <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/transaction' element={<Transaction setTransactionSuccessful={setTransactionSuccessful} />} />
                <Route path='/history' element={<History />} />
                <Route path='/settings' element={<Settings />} />
              </Routes>
            </div>
          </div>
          
          {transactionSuccessful && (
            <div role="alert" className="alert alert-success absolute bottom-0 right-0 mb-5 mr-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{transactionSuccessful}</span>
          </div>
          )}
          
        </div> 
        }
      />
      </Routes>
    </Router>
  )
}

export default App
