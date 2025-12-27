import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';

axios.defaults.withCredentials = true
axios.interceptors.response.use(response => {
  return response
}, error =>{
  if (!error.response) {
      console.warn("SERVER NEDOSTUPAN")
      return Promise.reject(error)
    }
  console.log("API ERROR:", error)
  if (error.response.status === 401) {
    console.warn("KORISNIK NIJE AUTORIZOVAN ZA PRISTUP APIJU")

    if (location.pathname !=="/login" && location.pathname !== "/register") {
    location.href = '/login'

    }
  } else if (error.response.status === 402) {
    console.warn("KORISNIK NEMA ODGOVARAJACU ULOGU")
  
    location.href = '/'
  } else if (error.response.status === 400) {
    let errormsg = ""
    if (error.response.data.message) {
      errormsg = "ERROR: " + error.response.data.message
    } else {
      errormsg = "Unknown error occured."
    }

    toast.error(errormsg, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});



  }

  return Promise.reject(error)
})

createRoot(document.getElementById('root')).render(

    <App />

)
