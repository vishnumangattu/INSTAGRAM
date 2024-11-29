import axios from 'axios';
import React, { useEffect,useState } from 'react'
import './Home.scss'


import { useNavigate } from 'react-router-dom';

const Home = ({setUser,setProfile}) => {
  const navigate=useNavigate()
  const token = localStorage.getItem("Token")
  const [posts,setPost]=useState([])
  const [images,setImages]=useState([])
  
  // console.log(token);
useEffect(()=>{
getUser()
},[])
  
  const getUser=async()=>{
   if(token){
    try {
      const res= await axios.get("http://localhost:3008/api/getuser",{headers:{"Authorization":`Bearer ${token}`}})
      // console.log(res);
      if(res.status==200){
        setUser(res.data.username)
        if(res.data.profile){
          setProfile(res.data.profile.profile)
        }
        getPosts()
      }
      else if(res.status==403){
        console.log("unauth");
        alert(res.data.msg)
        navigate('/signin')
      }
      else{
        navigate('/signin')

      }
      } catch (error) {
      console.log(error);
      navigate('/signin')
      
    }
   }
   else{
    navigate('/signin')
   }
   
  }
  
  const getPosts=async()=>{
    const res=await axios.get("http://localhost:3008/api/getallposts")
    console.log(res.data)
    setPost(res.data)
    // setImages(res.data)
    
    
  }

  console.log(posts);
  
  return (
    <>
      <div className="postmain">
        {posts.map((post, index) => (
          <div className="post" key={index}>
            {/* Post Header */}
            <div className="info">
              <div className="user">
                <div className="profile-pic">
                  <img src={ "pngegg.png"} alt="Profile" />
                </div>
                <p className="username">{ "Vishnu"}</p>
              </div>
            </div>
  
            {/* Post Images */}
            <ul className="list">
              {post.images.map((image, index) => (
                <li key={index} className="item">
                  <img src={image} alt="Post" />
                </li>
              ))}
            </ul>
  
            {/* Post Content */}
            <div className="post-content">
              <p className="likes">1,012 likes</p>
              <p className="description">
                <span>{post.username || "Vishnu"} </span>
                {post.description}
              </p>
              <p className="post-time">{post.postedDate}</p>
              <p className="post-time" style={{ float: "right" }}>
                {post.postedTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
  
}

export default Home