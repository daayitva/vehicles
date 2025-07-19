import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import DriverDashboard from './components/DriverDashboard'
function App() {
  return (
   <>
<BrowserRouter>
<Routes>
  <Route path='/' element={<LoginPage/>}/>
  <Route path='/signup' element={<SignupPage/>}/>
  <Route path='/driverhome' element={<DriverDashboard/>}/>
</Routes>
</BrowserRouter>
    </>
  )
}

export default App
