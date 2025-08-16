import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
const RouteSystem = () => {
  return (
    <div>
        <Router>
            <>
            <Routes>
                <Route path="/Login" Component={Login} />
                <Route path="/Register" Component={Register} />
            </Routes>
            </>
        </Router>
    </div>
  )
}

export default RouteSystem