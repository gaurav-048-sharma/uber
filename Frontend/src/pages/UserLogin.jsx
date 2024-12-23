/* eslint-disable no-unused-vars */
import React, {useState, useContext}from 'react'

import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";

const UserLogin = () => {
   const [email, setEmail] = useState('');
   const [password, setpassword] = useState('');
   const [userData, setUserData] = useState({});

   const navigate = useNavigate();
   const {user, setUser }= useContext(UserDataContext)
   

   const submitHandler =async (e) => {
    e.preventDefault();
    const userData = {
      email:email,
      password:password
    }


    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
    if(response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setEmail('');
    setpassword('');
   }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
       <div >
       <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
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
         <p className="text-center ">New here?<Link to="/signup" className="text-blue-600 ">Create a Account</Link></p>
      </form>
       </div>


       <div>
        <Link to='/captain-login' className="bg-[#111] flex text-[#fff] items-center justify-center font-semibold mb-7 rounded px-4 py-2 border w-full" >Sign in as Captain</Link>
       </div>
    </div>
  )
}

export default UserLogin
