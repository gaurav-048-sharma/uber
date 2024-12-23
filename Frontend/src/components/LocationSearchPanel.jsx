/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react'

const LocationSearchPanel = (props) => {

// console.log(props)
//sample for location
const locations = [
    "24B, near sharma's cafe shriyans coding school",
    "25B, shinghnaia coding school",
    "29B, mishra coding school",
    "16B, near rady cafe coding school",
]

  return (
    <div>
      {/* This is just a sample data */}
      {
        locations.map(function(elem, idx) {
            return <div key={idx} onClick={() => {
                props.setVehiclePanel(true)
                props.setPanelOpen(false)
            }} className='flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start'>
            <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12  rounded-full'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{elem}</h4>
          </div>
        })
      }
      
      
    </div>
  )
}

export default LocationSearchPanel
