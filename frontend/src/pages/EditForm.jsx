import React, { useEffect, useState } from 'react'
import { AppCard } from '../components/AppCard'
import { Archive, ArrowLeft, Calendar, ChartPie, CircleDot, Clock, Equal, FolderUp, FolderX, Link, Lock, Mail, Plus, Save, SquareCheck, Star, TableOfContents, Text, Trash } from 'lucide-react'
import YourFormsTable from '../components/YourFormsTable'
import { useNavigate, useParams } from 'react-router-dom'
import CreateModal from '../components/CreateModal'
import FieldTypePicker from '../components/FieldTypePicker'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';

const EditForm = () => {
  const params = useParams()
    const navigate = useNavigate()
    const [fields, setFields] = useState([]) 
    const [formtitle, setformtitle] = useState("")
    const [fullFormData, setFullFormData] = useState({})
    const [loading, setLoading] = useState(true)

    const HandleFormEdit = async(status)=>{
      setLoading(true)
let obj = {}
if (status && (status === "ready" || status === "published" || status === "archived")) {
  obj = {
    id: fullFormData._id,
    title: formtitle,
    fields: fields,
    status: status
  }
} else {
  obj = {
    id: fullFormData._id,
    title: formtitle,
    fields: fields
  }
}


try {
  const response = await axios.put(`${import.meta.env.VITE_BACKEND}/api/form`, obj)
if (response.status === 200) {
  hideLoader()
toast.success('Form updated successfully.', {
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
  hideLoader()
  toast.error("Error happened, form couldn't be updated.", {
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

const addField = (obj) =>{
   setFields(prev =>{
    const updated = [...prev, obj]
    console.log(updated)
    return updated
   })
  }


  const hideLoader = () =>{
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }
 const updateFieldValidation = (index, value) =>{
  setFields(prev =>{
    const updated = [...prev]
    updated[index] = {...updated[index], required: value}
    console.log(updated)
    return updated
  })
 }

 const setInitialFields = async()=>{
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/form/fields/${params.id}`)
    if (response.status === 200) {
      const form = response.data
      setFullFormData(form)
            console.log("fields:", form.fields)
            setFields(form.fields)
            const formtitle = form.title || "My Form..."
            setformtitle(formtitle)
            hideLoader()

    } 
  } catch (error) {
      setTimeout(() => {
        location.href = "/"
      }, 5000);
    
  }
 }


  const updateFieldLabel = (index, value) =>{

    let newValue = value.trim()
    if (newValue === "") {
      newValue = "field"
    }
  setFields(prev =>{
    
    const exists = fields.filter((item, ind) => item.label === newValue && ind !== index)

    if (exists.length > 0) {
      const countofunnamed = fields.filter(item => item.label.includes("field"))
      newValue = `field ${(countofunnamed.length + 1).toString()}`
    }
    const updated = [...prev]
    updated[index] = {...updated[index], label: newValue}
    console.log(updated)
    return updated
  })
 }

 const deleteField = (inddex) =>{
  setFields(prev => {
    
     const array = prev.filter((item, index) => index !== inddex)
     console.log(array)
    return array
  })
 }

 useEffect(()=>{
  if (formtitle.length === 0) {
setformtitle("Enter form title...")
  }
 })

 useEffect(()=>{
  setInitialFields()
 }, [])

  return (
    <>
    <AppCard>
        <CreateModal></CreateModal>
        <div className="flex flex-row gap-[35px] w-full h-full">
            <div className="flex flex-col justify-between h-full w-[20%]">
                <div className=" flex flex-col gap-3 flex-1">
                <span className='font-bold text-2xl gradient-text-blue'>MERN Forms</span>
                <button onClick={()=>{navigate('/')}} className="btn btn-secondary"><ArrowLeft/>My Forms</button>

                <span className='text-lg'>Add Field</span>
                <div className="grid grid-cols-1 gap-2 w-full overflow-y-scroll max-h-[calc(100%-200px)] pr-2">
                  <FieldTypePicker onUpdate={addField} icon={<Text></Text>} label={"Single Line Text"} type={'text'}></FieldTypePicker>
                  <FieldTypePicker onUpdate={addField} icon={<Mail/>} label={"Email"} type={'email'}></FieldTypePicker>
                  <FieldTypePicker onUpdate={addField} icon={<Lock/>} label={"Password"} type={'password'}></FieldTypePicker>
                  <FieldTypePicker onUpdate={addField} icon={<Equal/>} label={"Number"} type={'number'}></FieldTypePicker>
                  <FieldTypePicker onUpdate={addField} icon={<Calendar/>} label={"Date"} type={'date'}></FieldTypePicker>
                  <FieldTypePicker onUpdate={addField} icon={<Clock/>} label={"Time"} type={'time'}></FieldTypePicker>
                  <FieldTypePicker onUpdate={addField} icon={<SquareCheck/>} label={"Checkbox"} type={'checkbox'}></FieldTypePicker>
                  <FieldTypePicker onUpdate={addField} icon={<Link/>} label={"Link"} type={'url'}></FieldTypePicker>



                </div>
            </div>


            
            </div>
            
                        <div className="h-full w-[calc(80%-35px)]  text-xl flex flex-col gap-3">
                          <div className="flex justify-between w-full gap-[15px] items-center">
                            <div className="flex-1 min-w-0">
                              <input type="text" name="" id="" className='truncate block' onChange={(e)=>{setformtitle(e.target.value)}} value={formtitle}/>
                                                          

                            </div>
                            <div className="w-fit">
                              <details className="dropdown dropdown-end">
  <summary className="btn m-1 btn-primary btn-primary">Responses</summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mt-2">
    <li><a href={`/analytics/${params.id}/question`}><ChartPie></ChartPie> Question Analytics</a></li>
      <li><a href={`/responses/${params.id}/individual`}><TableOfContents></TableOfContents> Individual Responses</a></li>



  </ul>
</details>


                              <details className="dropdown dropdown-end">
  <summary className="btn m-1 btn-primary btn-outline">Continue</summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mt-2">
    <li onClick={()=>{HandleFormEdit()}}><a><Save></Save> Save</a></li>
      <li onClick={()=>{HandleFormEdit("published")}}><a><FolderUp></FolderUp> Save and Publish</a></li>
      <li onClick={()=>{HandleFormEdit("ready")}}><a><FolderX></FolderX> Unpublish</a></li>
      <li onClick={()=>{HandleFormEdit("archived")}}><a><Archive></Archive>Archive</a></li>


  </ul>
</details>

                            </div>
                          </div>


{/* FIELD VIEW*/}
<div className='h-full border-1 rounded-2xl border-[var(--color-secondary)] overflow-y-scroll p-4'>
{loading === true ? (
              <span className="loading loading-spinner loading-xl size-10 m-auto text-[var(--color-primary-content)]"></span>

):(
 fields.length === 0 ? (
    <>
    <span>Add fields from menu on left side.</span>
    <div role="alert" className="alert alert-warning mt-2">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
  <span>Warning: Do not enter same label value for multiple fields, as is it used as unique identificator of every field.</span>
</div>
</>
  ) : (
     fields.map((item, index)=>{
    return (
      <fieldset className="fieldset border-b duration-200 border-[var(--color-secondary)] mb-4 pb-4" key={index}>
        <div className="flex justify-between">


          <div className='w-fit flex flex-col gap-2'>
            <legend className="fieldset-legend">{item.label}</legend>
  <input  className={` ${item.type === "checkbox" ? ("checkbox") : ("input w-60")}`} required={item.required} type={item.type} {...item.type === "checkbox" ? {defaultChecked:false} : {}} />
  <p className="label">{item.required === false ? (
    "Opciono"
  ) : (
    ""
  )}</p>
          </div>

<div className='flex w-fit gap-2 items-end'>
  <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
  <legend className="fieldset-legend">Field validation</legend>
  <label className="label">
    <input type="checkbox" onChange={(e)=>{updateFieldValidation(index, e.target.checked)}} checked={item.required} className="toggle" />
    Required
  </label>
</fieldset>



<fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
  <legend className="fieldset-legend">Label</legend>
  <label className="label">
    <input type="text" onClick={(e)=>{e.target.select()}} id={`fieldlabelinput${index}`} onInput={(e)=>{updateFieldLabel(index, e.target.value)}} value={item.label} className='input h-fit' />
    
  </label>
</fieldset>
<button className='btn btn-outline btn-error h-[calc(50px)] mb-[10px] bottom-0 transition-all duration-200 ease-in-out text-[var(--color-error)] hover:text-white hover:h-[calc(70px)] hover:mb-0' onClick={(e)=>{deleteField(index)}}><Trash className=''></Trash></button>


</div>


        </div>
  
</fieldset>
    )
  })
  )
)}
 
</div>
{/* END FIELD VIEW */}
                        </div>

        </div>
    </AppCard>
    </>
  )
}

export default EditForm