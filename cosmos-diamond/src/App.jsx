import { useState } from 'react'
import './App.css'
import Homepage from './pages/homepage/Homepage'
import { RouterProvider } from 'react-router-dom'
import {router} from "./config/router"

function App() {
  return (

    <RouterProvider router={router} />


  )
}

export default App
