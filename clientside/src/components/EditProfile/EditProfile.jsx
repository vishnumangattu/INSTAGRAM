import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import './EditProfile.css'


const EditProfile = ({setProfile,setUser}) => {
  const navigate=useNavigate()
  const token = localStorage.getItem("Token")
  const [updateData,setUpdateData]=useState({})
  const [proBool,setProBool]=useState(false);
  useEffect(()=>{
      fetchUserData()

  },[])

  const handleSubmit = async(e) => {
    e.preventDefault()
    const res = await axios.post("http://localhost:3008/api/edituserdata",updateData,{headers:{"Authorization":`Bearer ${token}`}})
    console.log(res);
    if(res.status==201){
      alert(res.data.msg)
      navigate('/profile')
    }
    else{
      alert(res.data.msg)

    }
    }

  const fetchUserData=async()=>{
      const res = await axios.get("http://localhost:3008/api/getuserdata",{headers:{"Authorization":`Bearer ${token}`}})
      console.log(res);
      if(res.status==200){
        setUser(res.data.userData.username)
      
         if(res.data.profileData){
          setProfile(res.data.profileData.profile)
          const data= {profile:res.data.profile,username:res.data.userData.username,email:res.data.userData.email,bio:res.data.profileData.bio,phone:res.data.profileData.phone,gender:res.data.profileData.gender}
          setUpdateData(data)
          // console.log(updateData);
          res.data.profileData?setProBool(true):setProfileData(false)
         }
         else{
          setUpdateData(res.data.userData)


         }
      }
    }

    const handleChange=(e)=>{
      console.log(e.target.name);
      // console.log(e.target.value);
      setUpdateData((pre)=>({...pre,[e.target.name]:e.target.value}))
      
  }

  const handleFile=async(e)=>{
    console.log(e.target.files[0]);
    
    const profile=await convertBase64(e.target.files[0])
    // console.log(profile);
    setUpdateData((pre)=>({...pre,profile:profile}))
    
  }

function convertBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader()
        // console.log(fileReader);
        fileReader.readAsDataURL(file)
        fileReader.onload=()=>{
            resolve(fileReader.result);

        }
        fileReader.onerror=(error)=>{
            reject(error);
        }
        
    })

}



  return (
   <>
   <div className='body'>
   <div className="e-container">
        <h2>Edit Information</h2>
        <form>
            <label htmlFor="inputField">Name:</label>
            <input type="text" className='name' id="inputField" name="username" value={updateData.username} placeholder="" onChange={handleChange}/>
            <label htmlFor="inputField">Gender:</label>
            <input type="radio" name="gender" id="gender"  checked={updateData.gender==="Male"} value="Male" onChange={handleChange} /><span className="male">Male</span>
                        <input type="radio" name="gender" id="gender"checked={updateData.gender==="Female"}  onChange={handleChange} value="Female" /><span>Female</span>
                        <input type="radio" name="gender" id="gender" checked={updateData.gender==="Other"} onChange={handleChange} value="Other" /><span>Other</span> 
            <label htmlFor="inputField">Email:</label>
            <input type="email" className='' id="inputField" name="email" value={updateData.email} placeholder="" onChange={handleChange}/>

            <label htmlFor="inputField">Phone:</label>
            <input type="text" className='phone' id="inputField" value={proBool?updateData.phone:null} name="phone" placeholder="" onChange={handleChange}/>
            <label htmlFor="inputField">Bio:</label>
            <input type="text" className='bio' id="inputField" name="bio" value={proBool?updateData.bio:null} placeholder="" onChange={handleChange}/>
            <label htmlFor="inputField">Profile:</label>
            <input type="file"  id="profile" className="profile" onChange={handleFile} />

            <button className='edit' type="submit" onClick={handleSubmit} >{proBool?'Update':'Add'}</button>
        </form>
        <div className="footer">

        </div>

    </div>
   </div>

   </>
  )
}

export default EditProfile