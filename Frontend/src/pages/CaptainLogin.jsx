/* eslint-disable no-unused-vars */
import React, {useState, useContext} from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
const CaptainLogin = () => {
  const [email, setEmail] = useState('');
   const [password, setpassword] = useState('');

   const {captain, setCaptain} = React.useContext(CaptainDataContext);
   const navigate = useNavigate();

   const submitHandler =async (e) => {
    e.preventDefault();
    const captain = {
      email:email,
      password:password
    }
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
    if(response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate("/captain-home")
    }
    // console.log(captainData)
    setEmail('');
    setpassword('');
   }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
       <div >
       <img className="w-20 mb-10" src="https://pngimg.com/d/uber_PNG24.png"/>
      <form onSubmit={(e) => {
        submitHandler(e);
        
      }}>

         <h3 className="text-lg font-medium mb-2">What&apos;s your email</h3>
         <input required type="email" placeholder="email@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
         />
         <h3 className="text-lg font-medium mb-2">Enter Password</h3>
         <input required type="password" placeholder="password"
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          value={password}
            onChange={(e) => setpassword(e.target.value)}
         />
         <button className="bg-[#111] text-[#fff] font-semibold mb-7 rounded px-4 py-2 border w-full">Login</button>
         <p className="text-center ">New here?<Link to="/captain-signup" className="text-blue-600 ">Register as a Captain</Link></p>
      </form>
       </div>


       <div>
        <Link to='/login' className="bg-[#111] flex text-[#fff] items-center justify-center font-semibold mb-7 rounded px-4 py-2 border w-full" >Sign in as User</Link>
       </div>
    </div>
  )
}

export default CaptainLogin
