import React, { useState } from 'react'
import user_icon from './person.png'
import password_icon from './password.png'
import './SignUp.scss'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const navigate=useNavigate()
  const email=localStorage.getItem('email');
  
    const [user,setUser]=useState({
      email:email,
      username:"",
      password:"",
      cpassword:"",
    })

    const handleChange=(e)=>{
      setUser((pre)=>({...pre,[e.target.name]:e.target.value}))
    }

    const handleSubmit=async(e)=>{
      e.preventDefault()
      const res =await axios.post("http://localhost:3008/api/signup",user)
      console.log(res);
      if(res.status==200){
        alert(res.data.msg)
        localStorage.removeItem("email")
        navigate('/signin')

      }
      else{
        alert(res.data.msg)


      }
      


    }

  return (
 
  <div className="register">
  <div className="container">
    <h1>Create Password</h1>
    <form id="forms" onSubmit={handleSubmit}>
    <div className="form-group">
        <label htmlFor="password">UserName:</label>
        <input
          type="username"
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cpassword">Confirm Password:</label>
        <input
          type="password"
          id="cpassword"
          name="cpassword"
          value={user.cpassword}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</div>
  )
}

export default SignUp