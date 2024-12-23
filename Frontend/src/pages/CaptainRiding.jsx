/* eslint-disable no-unused-vars */
import React, {useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(function() {
        if(finishRidePanel) {
          gsap.to(finishRidePanelRef.current, {
            transform:"translateY(0)"
          })
        }else {
          gsap.to(finishRidePanelRef.current, {
            transform:"translateY(100%)"
          })
        }
      }, [finishRidePanel])
  return (
    <div className='h-screen relative'>
       
    <div className='fixed p-4 top-0 flex items-center justify-between w-screen'>
      <img className='w-16 ' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
      <Link to='/home' className=' h-14 w-14 bg-white flex items-center justify-center rounded-full'>
      <i className="ri-logout-box-r-line"></i>
    </Link>
    </div>
  <div className='h-4/5'>
    <img className='h-full w-full object-cover' src="https://cdn.dribbble.com/users/844221/screenshots/4539927/attachments/1027442/uber-search-2.png?resize=400x300&vertical=center" alt="" />
  </div>
  <div onClick={() => {
    setFinishRidePanel(true)
  }} className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'>
      <h5 className='p-1 text-center w-[90%] absolute top-0'
                onClick={() => {
                
                }} ><i className="text-3xl text-black ri-arrow-up-wide-fill"></i>
        </h5>
     <h4 className='text-xl font-semibold'>4 km away</h4>
     <button className=' bg-red-600 text-white font-semibold p-3 px-10 rounded-lg' >Complete Ride</button>
  </div>

  <div ref={finishRidePanelRef}  className='fixed w-full h-[75%] z-10 bottom-0 -translate-y-full bg-white px-3 py-6 pt-12' >
        <FinishRide setFinishRidePanel={setFinishRidePanel}/>
      </div>  


</div>
  )
}

export default CaptainRiding
