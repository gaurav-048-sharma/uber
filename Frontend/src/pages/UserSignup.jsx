/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import React, { useState , useContext} from "react";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";

const UserSignup = () => {

  const [email, setEmail] = useState('');
   const [password, setpassword] = useState('');

   const [firstName, setfirstName] = useState('');
   const [lastName, setlastName] = useState('');
   
   const [userData, setUserData] = useState({});

   const navigate = useNavigate();
   const {user, setUser }= useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname:firstName,
        lastname:lastName
      },
      email:email,
      password:password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    // console.log(userData);
    setEmail('');
    setpassword('');
    setfirstName('');
    setlastName('');
  }


  return (
    <div className="p-7 h-screen flex flex-col justify-between">
       <div >
       <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>


      <form onSubmit={(e) => {
        submitHandler(e);
      }}>
        <h3 className="text-lg font-medium mb-2">What&apos;s your name</h3>
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
         <button className="bg-[#111] text-[#fff] font-semibold mb-7 rounded px-4 py-2 border w-full">Create Account</button>
         <p className="text-center ">Already have an account? <Link to="/login" className="text-blue-600 ">Login </Link></p>
        </form>
       </div>


       <div>
        <p className="text-[10px]"> By proceding, you cannot to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its sffilates to the number provided.
        </p>
       </div>
    </div>
  )
}

export default UserSignup
