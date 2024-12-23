/* eslint-disable no-unused-vars */
import React, { useState , useRef} from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('')
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmedRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const panelCloseRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setwaitingForDriver] = useState(false)

  const submiHandler = (e) => {
    e.prevenDefault()
  }
  useGSAP(function() {
    if(panelOpen) {
      gsap.to(panelRef.current , {
        height:'70%',
        padding:24
        // opacity:1
      })

      gsap.to(panelCloseRef.current, {
        opacity:1
      })
    }else {
      gsap.to(panelRef.current , {
        height:'0%',
        padding:0
        //opacity:0
      })
      gsap.to(panelCloseRef.current, {
        opacity:0
      })
    }
  }, [panelOpen])

  useGSAP(function() {
    
      if(vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform:"translateY(0)"
        })
      }else {
        gsap.to(vehiclePanelRef.current, {
          transform:"translateY(100%)"
        })
      }
  }, [vehiclePanel])

  useGSAP(function() {
    
    if(confirmedRidePanel) {
      gsap.to(confirmedRidePanelRef.current, {
        transform:"translateY(0)"
      })
    }else {
      gsap.to(confirmedRidePanelRef.current, {
        transform:"translateY(100%)"
      })
    }
}, [confirmedRidePanel])

useGSAP(function() {
    
  if(vehicleFound) {
    gsap.to(vehicleFoundRef.current, {
      transform:"translateY(0)"
    })
  }else {
    gsap.to(vehicleFoundRef.current, {
      transform:"translateY(100%)"
    })
  }
}, [vehicleFound])

useGSAP(function() {
    
  if(waitingForDriver) {
    gsap.to(waitingForDriverRef.current, {
      transform:"translateY(0)"
    })
  }else {
    gsap.to(waitingForDriverRef.current, {
      transform:"translateY(100%)"
    })
  }
}, [waitingForDriver])


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-20 absolute left-5 top-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        {/* uber image */}
        <img className='h-full w-full object-cover' src="https://cdn.dribbble.com/users/844221/screenshots/4539927/attachments/1027442/uber-search-2.png?resize=400x300&vertical=center" alt="" />
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
              setPanelOpen(false)
             }} className='absolute opacity-0 right-6 top-6 text-2xl'>
          <i className ="ri-arrow-down-wide-line"></i>
          </h5>
        <h4 className='text-2xl font-semibold'>Find a trip</h4>
        <form onSubmit={(e) => {
          submiHandler(e)
        }}>
          <div className=' line absolute h-16 w-1 top-[35%] left-10 bg-gray-700 rounded-full' ></div>
          <input 
             onClick={() => {
              setPanelOpen(true)
             }}
             className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
             type='text' placeholder='Add a pick up location'
             value={pickup} 
             onChange={(e) => setPickup(e.target.value)}
             />

          <input 
             onClick={() => {
              setPanelOpen(true)
             }}
             className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
             type='text' placeholder='Enter your destination'
             value={destination} 
             onChange={(e) => setDestination(e.target.value)}
             />
          
        </form>
        </div>

        <div ref={panelRef} className=' bg-white h-0 text-lg font-medium'>
          <LocationSearchPanel  setPanelOpen={setPanelOpen}  setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed  w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14' >
        <VehiclePanel setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanel={setVehiclePanel}></VehiclePanel>
      </div>


      <div ref={confirmedRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12' >
        <ConfirmedRide setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFound={setVehicleFound}></ConfirmedRide>
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12' >
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12' >
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>

    </div>
  )
}

export default Home
