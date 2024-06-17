import { useState } from 'react'
import './App.css'
import Homepage from './pages/homepage/Homepage'
import { RouterProvider } from 'react-router-dom'
import {router} from "./config/router"
import { Provider } from 'react-redux'
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { StateProvider } from './Context/StateProvider'
function App() {
  return (

    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StateProvider>
        <RouterProvider router={router} />
      </StateProvider>
    </PersistGate>
  </Provider>


  )
}

export default App
