import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Transaction from './Pages/Transaction'
import History from './Pages/History'
import Settings from './Pages/Settings'

function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/transaction' element={<Transaction/>}/>
          <Route path='/history' element={<History/>}/>
          <Route path='/setting' element={<Settings/>}/>
        </Routes>
      </Router>
    
  )
}

export default App
