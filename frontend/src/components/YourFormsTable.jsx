import { CircleOff, Link, Pencil, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Tooltip from './Tooltip'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import momenttimezone from 'moment-timezone'
import CopyLinkModal from './CopyLinkModal';


const YourFormsTable = () => {
  const [link, setLink] = useState("")
  const statusMap = {
    ready: "Not Published",
    published: "Published",
    archived: "Archived"
  }



  const locationpath = location.pathname
  console.log(locationpath)

  const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    


    const getForms = async()=>{
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/form`)

          if (response && response.status === 200) {
            if (locationpath === "/favourite") {
setData(response.data.filter(item => item.owner.favourites.includes(item._id.toString())))
            } else {
              setData(response.data)
            }

setTimeout(() => {
        setLoading(false)
    }, 1000);
          }
        } catch (error) {
          console.log(error)
        }
      }


      const ToggleFavourite = async(id, favouriteValue) =>{
        setLoading(true)
        try {
          let opposite = !favouriteValue
          if (opposite === true) {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/user/favourites/${id}`)
            

            if (response.status === 200) {
              toast.info('You added form to Favourites.', {
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


              getForms()
              
            }
          } else if (opposite === false) {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND}/api/user/favourites/${id}`)

            if (response.status === 200) {
              toast.info('You removed form from Favourites.', {
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

              getForms()
            }
          }
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(()=>{
      

      getForms()
    }, [])
  return (
    <div>
      <CopyLinkModal link={link}></CopyLinkModal>
        {loading === true ? (
            <span className="loading loading-spinner loading-xl m-auto text-[var(--color-primary-content)]"></span>

        ):(
<div className="overflow-x-auto rounded-box border border-base-content/5 bg-[var(--color-secondary)]/50">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Status</th>
        <th>Responses</th>
        <th>Last Modified</th>
        <th>Actions</th>

      </tr>
    </thead>
    <tbody>
      {/* row 1 */}

{data.map((item, index)=>{
const isFavourite = item.owner.favourites.includes(item._id)
  return (
    
 <tr key={item._id}>
        <th>{index + 1}</th>
        <td>{item.title}</td>
        <td><div className={`badge ${item.status === "ready" ? ("badge-secondary") : item.status === "published" ? ("badge-primary") : item.status === "archived" ? ("badge-warning") : ("")}`}>{statusMap[item.status]}</div></td>
        <td>
            
          {item.responseCount === 0 ? "No Responses" : item.responseCount === 1 ? `${item.responseCount.toString()} response` : `${item.responseCount.toString()} responses`}
          </td>
        <td>{momenttimezone(item.updatedAt)
  .tz("Europe/Belgrade")
  .format("DD.MM.YYYY. HH:mm:ss")}</td>
        <td className='flex gap-2'>
          <Tooltip value={`${isFavourite === true ? ("Remove from favourites") : ("Add to favourites")}`}>
            <button className="btn btn-secondary p-2" onClick={()=>{ToggleFavourite(item._id, isFavourite)}}><Star className='size-5' fill={isFavourite ? ("currentColor") : ("none")}></Star></button>
          </Tooltip>
            
            <Tooltip value={"Edit Form"}>
              <a href={`/form/${item._id}/edit`}>
                            <button className="btn btn-secondary p-2"><Pencil className='size-5'></Pencil></button>
</a>            
              </Tooltip>
            {item.status === "published" && (
              <Tooltip value={"Copy Link"}><button className="btn btn-secondary p-2" onClick={()=>{[setLink(`${import.meta.env.VITE_FRONTEND}/form/${item._id}/fill`), document.getElementById('copylink').showModal()]}}><Link className='size-5' ></Link></button></Tooltip>

            )}
        </td>
      </tr>
  )
})}



    </tbody>

    
  </table>

  {data.length === 0 && (
      <div className="mt-5 pb-5 w-full min-h-5 flex flex-col gap-3 justify-center items-center">
<CircleOff className='size-10'></CircleOff>
<span>You have no forms.</span>
      </div>
    )}
</div>
        )}

        


    </div>
  )
}

export default YourFormsTable