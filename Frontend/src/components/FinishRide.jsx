/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
    <div>
    <h5 className='p-1 text-center w-[93%] absolute top-0'
      onClick={() => {
        props.setFinishRidePanel(false)
        }} ><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
        
    </h5>
    <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
    <div className='flex items-center justify-between p-3 bg-black rounded-lg mt-4'>
      <div className='flex items-center gap-3 '>
          <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
          <h2 className='text-xl font-medium text-white'>Harshita patel</h2>
      </div>
      <h5 className='text-lg font-semibold text-white'>2.2 KM</h5>
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
                   <h3 className='text-xl font-medium'>Rs193.20</h3>
                   <p className='text-md -mt-1 text-gray-600'>Cash</p>
                 </div>
              </div>
              
          </div>
              <div className='mt-10 w-full'>
                  
                     <Link to='/captain-home' className='flex text-lg justify-center w-full mt-5 bg-black text-white font-semibold p-3 rounded-lg'> Finish Ride</Link>

                      {/* <p className=' mt-6 text-sm flex justify-center'>Click on finish ride if you have completed the payment</p> */}
              </div>
    </div>

  </div>
  )
}

export default FinishRide
