/* eslint-disable no-unused-vars */
import React, {useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
const CaptainHome = () => {

     const [ridePopupPanel, setridePopupPanel] = useState(true)
     const ridePopupPanelRef = useRef(null)
     const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
     const confirmRidePopupPanelRef = useRef(null)

     useGSAP(function() {
    
      if(ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform:"translateY(0)"
        })
      }else {
        gsap.to(ridePopupPanelRef.current, {
          transform:"translateY(100%)"
        })
      }
    }, [ridePopupPanel])

    useGSAP(function() {
      if(confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform:"translateY(0)"
        })
      }else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform:"translateY(100%)"
        })
      }
    }, [confirmRidePopupPanel])
    



  return (
    <div className='h-screen'>
      <div className='fixed p-4 top-0 flex items-center justify-between w-screen'>
        <img className='w-16 ' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <Link to='/captain-home' className=' h-14 w-14 bg-white flex items-center justify-center rounded-full'>
        <i className="ri-logout-box-r-line"></i>
      </Link>
      </div>
    <div className='h-3/5'>
      <img className='h-full w-full object-cover' src="https://cdn.dribbble.com/users/844221/screenshots/4539927/attachments/1027442/uber-search-2.png?resize=400x300&vertical=center" alt="" />
    </div>
    <div className='h-2/5 p-6'>
       <CaptainDetails/>
    </div>

    <div ref={ridePopupPanelRef}  className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12' >
        <RidePopUp setridePopupPanel={setridePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
      </div>

      <div ref={confirmRidePopupPanelRef}  className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12' >
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setridePopupPanel={setridePopupPanel}/>
      </div>  



  </div>
  )
}

export default CaptainHome
