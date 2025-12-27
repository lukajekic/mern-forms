import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'

const CopyLinkModal = ({link}) => {
    const [creation, setCreation] = useState(false)
    const [field1, setfield1] = useState("")
const [field1val, setfield1val] = useState(false)
    const startCreation = () =>{
        setfield1val(false)
        if (field1) {
            setCreation(true)
            setTimeout(() => {
                handleAPIPosting()
            }, 1000);

        } else {
            setfield1val(true)
        }
    }


    const handleAPIPosting = async ()=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/form`, {
                title: field1, description: "", fields: [], status: "ready"
            })

            if (response.status === 201) {
                location.href = `/form/${response.data._id}/edit`
            } else {
                toast.error('Error prevent form creation, try again.', {
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
        } catch (error) {
            console.log(error)
            toast.error('Error prevent form creation, try again.', {
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
    }

  return (
    <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="copylink" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Share Form</h3>

    <p className='text-sm mt-2'>Click on "Copy Link" to copy form filling link.</p>
    <input type="text" value={link} disabled className="input mt-6 w-full" />

    <div className="modal-action">
        {/* if there is a button in form, it will close the modal */}
        <button type='button' className="btn" onClick={()=>{document.getElementById('copylink').close()}}>Close</button>
                <button className="btn btn-primary" type='submit' onClick={()=>[window.navigator.clipboard.writeText(link), document.getElementById('copylink').close(), toast.info("Link is copied to clipboard.")]}>
                    {creation === true ? (
                        <span className="loading loading-spinner text-white"></span>

                    ): (
                        <span>Submit</span>
                    )}
                </button>

      
    </div>
  </div>
</dialog>
    </div>
  )
}

export default CopyLinkModal