import React, { useEffect, useState } from 'react'
import { AppCard } from '../components/AppCard'
import { ChevronLeft } from 'lucide-react'
import Chart from "react-apexcharts";
import APCard from '../components/APCard';
import { useFetcher, useNavigate, useParams } from 'react-router-dom'
import LoadingModal from '../components/LoadingModal'
import axios from 'axios'
const QuestionAnalytics = () => {
  const [expandView, setExpandView] = useState(false)
  const params = useParams()
 const [fields, setFields] = useState([]) 
    const [fullFormData, setFullFormData] = useState({})
    const [loading, setLoading] = useState(true)

    const [display, setDisplay] = useState("")

    const [analyticsData, setAnalyticsData] = useState({})
    const [entries, setEntries] = useState([])
  const toggleExpandedView = () => {
    setExpandView(!expandView)
  }

  useEffect(()=>{
    showLoader()
    setInitialFields()
  }, [])

  const [chart1, setChart1] = useState({
    options: {
      chart: { id: "basic-bar" },
      xaxis: { categories: ["True", "False"] },
    },
    series: [{ name: "Serija 1", data: [20, 80] }],
  });

  const [chart2, setChart2] = useState({
    options: { labels: ['True', 'False'] },
    series: [20, 80]
  })

const hideLoader = () =>{

      setLoading(false)
      document.getElementById('loading').close()

  }

  const showLoader = () =>{
    setTimeout(() => {
      setLoading(true)
      document.getElementById('loading').showModal()
    }, 0);
  }

const setInitialFields = async()=>{
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/form/fields/${params.id}`)
    if (response.status === 200) {
      const form = response.data
      setTimeout(() => {
        setFullFormData(form)
      setFields(form.fields)
      hideLoader()
      
      }, 1000);

    } 
  } catch (error) {
      console.log(error)
    
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

const getAnalytics = async(fieldid, type) =>{
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/analytics/question?id=${fieldid}&type=${type}&formID=${params.id}`)
    if (response.status === 200) {
      if (type === "checkbox") {
        setDisplay("chart")
        setExpandView(true)
        setChart1({
    options: {
      chart: { id: "basic-bar" },
      xaxis: { categories: ["True", "False"] },
    },
    series: [{ name: "Percentage", data: [response.data.true.toFixed(2), response.data.false.toFixed(2)] }],
  })

  setChart2({
    options: { labels: ['True', 'False'] },
    series: [response.data.true, response.data.false]
  }
)
      } else {
        setDisplay("table")
        const data = response.data
        let entries = Object.entries(data)
        entries = entries.sort((a,b)=>b[1] - a[1])
        console.log(entries)
        setExpandView(true)
        setEntries(entries)
      }

      console.log(display)
      console.log(response.data)
      
    }
  } catch (error) {
    console.log(error)
  }
}
  return (
    <AppCard>
      <LoadingModal></LoadingModal>
      {/* 1. GLAVNI WRAPPER: Flex Column da bi naslagali Header pa Content */}
      <div className="flex flex-col h-full gap-4">
        
        {/* HEADER SEKCIJA (Ne menja se, ali stavljamo shrink-0 da se ne smanjuje) */}
        <div className="shrink-0 flex flex-col gap-2">
            <div className="flex items-center gap-4">
                <button onClick={()=>{location.href =`/form/${params.id}/edit`}} className="btn btn-soft w-fit"><ChevronLeft /></button>
                <h1 className='text-xl font-bold'>Question Analytics</h1>
            </div>
         
        </div>

 
        <div className="flex flex-1 min-h-0 w-full overflow-hidden border border-gray-200 rounded-2xl">
          
          {/* LEVA STRANA (Zeleno) */}
          <div
            className={`transition-all rounded-l-2xl  p-7 overflow-y-auto min-h-0 h-full
              ${expandView ? 'lg:w-[400px] md:w-[300px] sm:w-[250px]' : 'w-full rounded-r-2xl'}`}>
                <div className={`flex flex-wrap gap-2 w-full ${expandView ? ('flex-col') : ('flex-row')}`}>
{fields.map((item,index)=>(
                   <APCard key={item.id} onClick={()=>{getAnalytics(item.id, item.type)}} expandView={expandView} index={index+1} title={item.label} type={fancyTypeMAP[item.type]}></APCard>

))}
                </div>
          </div>


          <div
            className={`transition-all rounded-r-2xl  overflow-y-auto min-h-0 h-full pb-20
              ${expandView ? 'flex-1' : 'w-0 overflow-hidden'}`}
          >
            <div className="p-4">
                

                {display === "chart" ? (
                  <div className="w-full flex">
                  <div className='w-1/2'>
                  <Chart
                options={chart1.options}
                series={chart1.series}
                type="bar"
                width="100%"
                height={300}
                />
</div>

<div className='w-1/2'>
                <Chart
                options={chart2.options}
                series={chart2.series}
                type="pie"
                width="100%"
                height={300}
                />
                </div>
                </div>
                ):display === "table" ? (


                  

<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th className='w-5'></th>
        <th className=''>Answer</th>
        <th className='w-5'>Count</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {entries.map(([answer,count], index)=>{
        return (
     <tr className='animate-fade-in' style={{opacity: 1, transitionDelay: `${index * 100}ms`}}>
        <th>{index + 1}</th>
        <td>{answer}</td>
        <td><div className={`badge ${index === 0?("badge-success text-white"):count===0?("badge-error"):("badge-neutral")}`}>{count}</div></td>
      </tr>
        )
      })}
 

    
    </tbody>
  </table>
</div>
                ):(<></>)}



            </div>
          </div>
        </div>

      </div>
    </AppCard>
  )
}

export default QuestionAnalytics