import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Logo from './components/Logo'
import FavouriteForms from './pages/FavouriteForms'
import EditForm from './pages/EditForm'
import FillForm from './pages/FillForm'
import IndividualResponses from './pages/IndividualResponses'
import QuestionAnalytics from './pages/QuestionAnalytics'
import Chart from 'react-apexcharts'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer, toast, Bounce } from 'react-toastify';



function App() {

  return (

  <BrowserRouter>
  <ToastContainer/>
      <Logo></Logo>
  <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/favourite' element={<FavouriteForms></FavouriteForms>}></Route>
      <Route path='/form/:id/edit' element={<EditForm></EditForm>}></Route>
      <Route path='/form/:id/fill' element={<FillForm></FillForm>}></Route>
      <Route path='/analytics/:id/question' element={<QuestionAnalytics></QuestionAnalytics>}></Route>
      <Route path='/responses/:id/individual' element={<IndividualResponses></IndividualResponses>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>

  </Routes>

  </BrowserRouter>
  )
}

export default App
