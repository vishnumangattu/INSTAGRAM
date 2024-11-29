import React, { useState } from 'react'
import './Email.scss'
import email_icon from './email.png'
import { Link,useNavigate } from 'react-router-dom'

import axios from 'axios'


const Email = () => {
  const [email,setEmail]=useState("")
  const navigate=useNavigate()

  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const res = await axios.post("http://localhost:3008/api/checkemail",{email})
    console.log(res);
    if(res.status==200){
      alert(res.data.msg)
      localStorage.setItem('email',email)
      navigate('/signup')
    }
    else{
      alert(res.data.msg)
    }
  }

  // asd=()=>{
  //   const res=await axios.post("http://localhost",{email},{})
  // }
  return (
    <div className="email">
      <div className="container">
        <h1>User Registration</h1>
        <form id="forms" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Email'
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" onClick={handleSubmit} >VERIFY
          </button>
        </form>
      </div>
    </div>
  )
}

export default Email