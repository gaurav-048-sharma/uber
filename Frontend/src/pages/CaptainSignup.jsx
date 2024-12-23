/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import React, { useState , useContext} from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CaptainSignup = () => {


  const navigate = useNavigate();
  const [email, setEmail] = useState('');
   const [password, setpassword] = useState('');

   const [firstName, setfirstName] = useState('');
   const [lastName, setlastName] = useState('');
   const [vehicleColor, setVehicleColor] = useState('');
   const [vehiclePlate, setVehiclePlate] = useState('');
   const [vehicleCapacity, setVehicleCapacity] = useState('');
   const [vehicleType, setVehicleType] = useState('');
   
   const [captainData, setcaptainData] = useState({});

   const {captain , setCaptain}= React.useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname:firstName,
        lastname:lastName
      },
      email:email,
      password:password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

    if(response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token)
      navigate('/captain-home')

    }

    // console.log(captainData);
    setEmail('');
    setpassword('');
    setfirstName('');
    setlastName('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
       <div >
       <img className="w-20 mb-10" src="https://pngimg.com/d/uber_PNG24.png"/>


      <form onSubmit={(e) => {
        submitHandler(e);
      }}>
        <h3 className="text-lg w-full font-medium mb-2">What&apos;s our captain&apos;s name</h3>
        <div className="flex gap-4 mb-6">
            <input required type="text" placeholder="First name" 
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
            />
            <input required type="text" placeholder="Last name" 
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
            />
        </div>
         <h3 className="text-lg font-medium mb-2">What&apos;s your email</h3>
         <input required type="email" placeholder="email@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
         />
         <h3 className="text-lg font-medium mb-2">Enter Password</h3>
         <input required type="password" placeholder="password"
          className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
         />

         <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
         <div className="flex gap-4 mb-5">
            <select required
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                defaultValue=""
            >
                <option value="" disabled>Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
            </select>
            <input required type="number" placeholder="Vehicle Capacity" 
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
            />
         </div>
         <div className="flex gap-4 mb-7">
            <input required type="text" placeholder="Vehicle Number" 
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
            />
            <input required type="text" placeholder="Vehicle Color"
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                value={vehicleColor} 
                onChange={(e) => setVehicleColor(e.target.value)}
            />
         </div>


         
         <button className="bg-[#111] text-[#fff] font-semibold mb-7 rounded px-4 py-2 border w-full">Create Captain Account</button>
         <p className="text-center ">Already have an account? <Link to="/captain-login" className="text-blue-600 ">Login </Link></p>
        </form>
       </div>


       <div className="flex justify-center">
        <p className="text-[10px] mt-6 leading-tight " > This site is proteted by reCAPTCHA and the &nbsp;<span className="underline"> Google Privacy Policy</span>
         &nbsp; and <span className="underline">Terms of Service apply</span>
        </p>
       </div>
    </div>
  )
}

export default CaptainSignup
