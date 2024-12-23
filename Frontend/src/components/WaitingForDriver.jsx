/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
       <h5 className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => {
            props.waitingForDriver(false)
          }} ><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
          
      </h5>
      <div className='flex items-center justify-between'>
        <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
        <div className='text-right'>
            <h2 className='text-lg font-medium'>Rohan</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP 04 DJ 9393</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>

        </div>
      </div>

      <div className="flex justify-between gap-2 flex-col items-center">
           
            
            <div className='w-full mt-5 '>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                   <i className="text-3xl ri-map-pin-user-fill"></i>
                   <div>
                     <h3 className='text-xl font-medium'>562/11-A</h3>
                     <p className='text-md -mt-1 text-gray-600'>Block A, Sector 1, Gulshan, Bhopal</p>
                   </div>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="text-3xl ri-map-pin-user-fill"></i>
                   <div>
                     <h3 className='text-xl font-medium'>562/11-A</h3>
                     <p className='text-md -mt-1 text-gray-600'>Block A, Sector 1, Gulshan, Bhopal</p>
                   </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                <i className="text-3xl ri-currency-line"></i>
                   <div>
                     <h3 className='text-xl font-medium'>₹193.20</h3>
                     <p className='text-md -mt-1 text-gray-600'>Cash</p>
                   </div>
                </div>
            </div>
                
      </div>

    </div>
  )
}

export default WaitingForDriver
