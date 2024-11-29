import React, { useState } from 'react'
import './SignIn.scss'
import user_icon from '../SignUp/person.png'
import email_icon from '../SignUp/email.png'
import password_icon from '../SignUp/password.png'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'



const SignIn = () => {
  const navigate=useNavigate()

  const [loginData,setLoginData]=useState({
    email:"",
    password:""
  })

 

  const handleChange=(e)=>{
    setLoginData((pre)=>({...pre,[e.target.name]:e.target.value}))
    // console.log(loginData);
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send POST request
      const res = await axios.post("http://localhost:3008/api/signin", loginData);
  
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("Token", res.data.token);
        alert(res.data.msg); 
        navigate('/'); 
      }
    } catch (error) {
  
      if (error.response) {
        alert(`Error: ${error.response.data.msg}`);
      }
       else {
        alert(`Error: ${error.message}`);
      }
    }
  };
  
  
  return (
  
  <div className="login">
  <div className="container">
  <div className="center">
      <h1>Login</h1>
      <form  id="forms">
          <div className="txt_field">
              <input type="email" name="email" onChange={handleChange} required id="email"/>
              <span></span>
              <label>Email</label>
          </div>
          <div className="txt_field">
              <input type="password" name="password" onChange={handleChange} required id="password"/>
              <span></span>
              <label>Password</label>
          </div>
        {/* <Link  to={'/email'}>  Forgot Password</Link> */}
          <input name="submit" onClick={handleSubmit} type="Submit" />
          <div className="signup_link">
              Create an Account <Link to={'/email'}>Sign Up</Link>
          </div>
      </form>
  </div>
</div>
</div>
    
  )
}

export default SignIn