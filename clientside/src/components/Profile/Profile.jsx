import React, { useEffect, useState } from 'react'
import './Profile.scss'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import user_icon from './person.png'


const Profile = ({setUser,profile,setProfile}) => {
    const navigate=useNavigate()
    const token = localStorage.getItem("Token")
    const [userData,setUserData]=useState({})
    const [profileData,setProfileData]=useState({})
    const [proBool,setProBool]=useState(false);
    // const [images,setImages]=useState([])
    const [posts,setPost]=useState([])

    useEffect(()=>{
        fetchUserData(),
        getPosts()

    },[])

    const fetchUserData=async()=>{
        const res = await axios.get("http://localhost:3008/api/getuserdata",{headers:{"Authorization":`Bearer ${token}`}})
        // console.log(res);
        
        if(res.status==200){
            setUserData(res.data.userData)
            res.data.profileData?setProfileData(res.data.profileData):setProfileData({})
            res.data.profileData?setProBool(true):setProfileData(false)
            setProfile(res.data.profileData.profile)
            // setImages(res.data.postData.images)     
        }
    }

    const getPosts=async()=>{
        const res=await axios.get("http://localhost:3008/api/getpost",{headers:{"Authorization":`Bearer ${token}`}})
        console.log(res);
        setPost(res.data);
      }
    const deleteUser=async(_id)=>{
       if(confirm("Do you want to delete your account?")){
        const res= await axios.delete(`http://localhost:3008/api/deleteuser/${_id}`)
        // console.log(res);
        
        if(res.status==200){
            localStorage.removeItem("Token")
            alert(res.data.msg)
            navigate('/signin')
        }
        else{
            alert(res.data.msg)


       }
    }

}
  return (
    <>
     <div className="prof-container">
        <div className="left" id="left">
        <table className="table">
            <div className="img">
                <img src={profile?profile:user_icon} alt="" />
            </div>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{userData.username}</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>{proBool?profileData.gender:'-'}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{userData.email}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{proBool?profileData.phone:'-'}</td>
                    </tr>
                    <tr>
                        <th>Bio</th>
                        <td className='bio'>{proBool?profileData.bio:"-"}</td>
                    </tr>
                   
                   
                   
                    <tr>
                        <td className="actions" colSpan="2">
                          <Link to={'/editprofile'}> <button type="button" className="edit-btn">{proBool?'EDIT':'CREATE'}</button></Link>
                            <button type="button" className="delete-btn" onClick={()=>{deleteUser(userData._id)}}  >DELETE</button><br />
                        <button type="button" className="log-out-btn"  onClick={()=>{
                            localStorage.removeItem('Token')
                            setUser("")
                            navigate('/signin')
                            }}>LOGOUT</button>

                        </td>
                    </tr>
                    
                </tbody>
                </table>

        </div>
        <div className="right" id="right">
  <div className="men-cards" id="products">
    <Link to={'/addpost'}>
      <button className="edit-btn">ADD POST</button>
    </Link>
    {posts.map((post) => (
      <Link to={`/displaypost/${post._id}`} key={post._id}>
        <div className="post-card">
          <div className="post-image">
            <img src={post.images[0]} alt="Post" />
          </div>
          <div className="post-footer">
            <p className="description">{post.description}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>

       
        </div>
       
            
           
        
   

    </>
  )
}

export default Profile