import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import WelcomePage from './pages/WelcomePage/WelcomePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import UpdateFoodDetails from './pages/UpdateFoodDetails/UpdateFoodDetails'
import AddCategory from './pages/AddCategory/AddCategory'
import AdminFeedback from './pages/AdminFeedback/AdminFeedback'

const App = () => {

  const url = "http://localhost:3000"

  return (
    <>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/' element={<WelcomePage url={url}/>} />
          <Route path='/add' element={<Add url={url}/>} />
          <Route path='/list' element={<List url={url}/>} />
          <Route path='/orders' element={<Orders url={url}/>} />
          {/* <Route path='/update' element={<UpdateFoodDetails url={url}/>} /> */}
          {/* <Route path='/UpdateCategory' element={<AddCategory url={url}/>}/> */}
          <Route path='/AdminFeedback' element={<AdminFeedback url={url}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
