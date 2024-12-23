/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [otp, setotp] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
    }
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => {
          props.setConfirmRidePopupPanel(false)
          }} ><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
          
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>A Ride Available!</h3>
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
                <div className='mt-6 w-full'>
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <input value={otp} onChange={(e) => {
                            setotp(e.target.value)
                        }} type='text' placeholder='Enter OTP'
                           className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-5'
                        />
                       <Link to='/captain-riding' className='flex justify-center text-lg w-full mt-5 bg-black text-white font-semibold p-3 rounded-lg'> Confirm</Link>

                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)
                        }} className='w-full mt-4 bg-red-500 text-lg text-black font-semibold p-3 rounded-lg'> Cancel</button>
                    </form>
                </div>
      </div>

    </div>
  )
}

export default ConfirmRidePopUp
