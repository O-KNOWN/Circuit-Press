import { useState } from 'react'
import './App.css'
import Default from './Page/Default'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Page/login';
function App() {

  return (
    <>
       <Router>
          <Routes>
            <Route path="/" element={<Default />} />
            <Route
              path="/login"
              element={ <Login />}
            />
          </Routes>
        </Router>
      
    </>
  )
}

export default App
