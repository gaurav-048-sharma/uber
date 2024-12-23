/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
       <h5 className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => {
            props.setVehicleFound(false)
          }} ><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
          
      </h5>
      <h3 className='text-2xl font-semibold mb-3 '>Looking for a Driver</h3>

      <div className="flex justify-between gap-2 flex-col items-center">
            <img className='h-25' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
            
            
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
                     <h3 className='text-xl font-medium'>Rs193.20</h3>
                     <p className='text-md -mt-1 text-gray-600'>Cash</p>
                   </div>
                </div>
            </div>
                
      </div>

    </div>
  )
}

export default LookingForDriver
