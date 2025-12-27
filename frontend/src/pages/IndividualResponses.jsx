import React, { useEffect, useState } from 'react'
import { AppCard } from '../components/AppCard'
import { ChevronLeft } from 'lucide-react'
import LoadingModal from '../components/LoadingModal'
import IRCard from '../components/IRCard';
import axios from 'axios'
import moment from 'moment-timezone';
import { useParams } from 'react-router-dom';

const IndividualResponses = () => {
  const [expandView, setExpandView] = useState(false)
  const params = useParams()
  const [fields, setFields] = useState([]) 
  const [fullFormData, setFullFormData] = useState({})
  const [responses, setResponses] = useState([])

  const [primaryField, setPrimaryField] = useState("")
  const [leftView, setLeftView] = useState(null)  
    const [rightView, setRightview] = useState(null)  

  const [loading, setLoading] = useState(false)

   
  const toggleExpandedView = () => setExpandView(!expandView)

  useEffect(()=>{
    showLoader()
    setInitialFields()
    getAllResponses()
  }, [])

  const hideLoader = () => setLoading(false)
  const showLoader = () => setLoading(true)

  const setInitialFields = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/form/fields/${params.id}`)
      if (response.status === 200) {
        const form = response.data
        setFullFormData(form)
        setFields(form.fields)
      } 
    } catch (error) {
      console.log(error)
    }
  }

  const getAllResponses = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/response?form=${params.id}`)
      if (response.status === 200) {
        setResponses(response.data.reverse())
        hideLoader()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fancyTypeMAP = {
     text: "Single Line Text",
    email: "Email",
    url: "Link",
    number: "Number",
    checkbox: "Checkbox",
    password: "Password",
    date: "Date",
    time: "Time"
  }

  const formatFieldValue = (field, values) => {
    const value = values?.[field.id];

    switch (field.type) {
      case "checkbox":
        return value ? "Yes" : "No";
      case "date":
        return value ? moment(value).format("DD. MM. YYYY") : "";
      case "time":
        return value ? moment(value, "HH:mm").format("HH:mm") : "";
      case "number":
        return value !== undefined ? value.toString() : "";
      default:
        return value ?? "";
    }
  }

  const getFieldValueICCard = (values) => {
    if (!primaryField) return "";
    const field = fields.find(f => f.id === primaryField);
    if (!field) return "";
    return formatFieldValue(field, values);
  }

  return (
    <AppCard>
      <LoadingModal />

      <div className="flex flex-col h-full gap-4">
        <div className="shrink-0 flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <button onClick={()=>{location.href = `/form/${params.id}/edit`}} className="btn btn-soft w-fit">
              <ChevronLeft />
            </button>
            <h1 className='text-xl font-bold'>Individual Responses</h1>
          </div>

          <div className="w-full items-end flex justify-between">
            <fieldset className="fieldset">
            <legend className="fieldset-legend">Primary Field</legend>
            <select value={primaryField} onChange={(e)=>setPrimaryField(e.target.value)} className="select w-80">
              <option value={""} disabled>Pick a field</option>
              {fields.map(item => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </fieldset>

          <button className='btn' onClick={()=>{setRightview(null)}}>Clear Right View</button>
          </div>
        </div>

        <div className="flex flex-1 min-h-0 w-full overflow-hidden border border-gray-200 rounded-2xl">
          <div className={`transition-all rounded-l-2xl p-7 overflow-y-auto min-h-0 h-full
            ${expandView ? 'lg:w-[400px] md:w-[300px] sm:w-[250px]' : 'w-full rounded-r-2xl'}`}>
            <div className={`flex flex-wrap gap-2 w-full ${expandView ? 'flex-col' : 'flex-row'}`}>
              {responses.map((item, index) => (
                <IRCard
                  key={item._id}
                  onClick={() => {
                    setLeftView(item.values)
                    setExpandView(true);
                  }}


                  openRIGHT={() => {
                    setRightview(item.values)
                    setExpandView(true);
                  }}
                  expandView={expandView}
                  index={index + 1}
                  title={moment(item.createdAt).tz('Europe/Belgrade').format("DD. MM. YYYY. HH:mm")}
                  subtitle={getFieldValueICCard(item.values)}
                />
              ))}
            </div>
          </div>

          <div className={`transition-all rounded-r-2xl overflow-y-auto min-h-0 h-full
            ${expandView ? 'flex-1' : 'w-0 overflow-hidden'}`}>
            <div className="flex w-full h-full">
              <div className="p-4 w-1/2 h-full overflow-y-auto border-l-2 border-b-2 border-t-2 border-dashed border-[#cecece]">
                {leftView && (
                  <div className="flex flex-col gap-2">
                    {fields.map((field) => (
                      <div key={field.id} className="flex gap-2">
                        <span className="font-semibold">{field.label}:</span>
                        <span>{formatFieldValue(field, leftView)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 w-1/2 h-full border-2 border-dashed border-[#cecece] rounded-r-2xl">
              {rightView && (
                  <div className="flex flex-col gap-2">
                    {fields.map((field) => (
                      <div key={field.id} className="flex gap-2">
                        <span className="font-semibold">{field.label}:</span>
                        <span>{formatFieldValue(field, rightView)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppCard>
  )
}

export default IndividualResponses
