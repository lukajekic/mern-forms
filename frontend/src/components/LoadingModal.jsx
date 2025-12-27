import React from 'react'

const LoadingModal = () => {
  return (
    <div>

        {/* You can open the modal using document.getElementById('ID').showModal() method */}
<dialog id="loading" className="modal">
  <div className="modal-box w-fit max-w-fit h-fit">




            <span className="loading loading-spinner loading-xl m-auto text-[var(--color-primary-content)]"></span>


    
  </div>
</dialog>


    </div>
  )
}

export default LoadingModal