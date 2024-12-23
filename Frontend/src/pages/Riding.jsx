/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const Ride = () => {
  return (
    <div className='h-screen'>
      <Link to='/home' className='fixed  right-2 top-2 h-14 w-14 bg-white flex items-center justify-center rounded-full'>
           <i className="text-2xl font-bold  ri-home-5-line"></i>
      </Link>
      <div className='h-1/2'>
        <img className='h-full w-full object-cover' src="https://cdn.dribbble.com/users/844221/screenshots/4539927/attachments/1027442/uber-search-2.png?resize=400x300&vertical=center" alt="" />
      </div>
      <div className='h-1/2 p-4'>
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
                      <div className='flex items-center gap-5 p-3'>
                      <i className="text-3xl ri-currency-line"></i>
                        <div>
                          <h3 className='text-xl font-medium'>Rs193.20</h3>
                          <p className='text-md -mt-1 text-gray-600'>Cash</p>
                        </div>
                      </div>
                  </div>
                      
            </div>

         <button  className='w-full mt-5 bg-green-500 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
      </div>
    </div>
  )
}

export default Ride
