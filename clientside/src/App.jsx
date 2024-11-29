import { useState } from 'react'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import './App.css'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Email from './components/Email/Email'
import Profile from './components/Profile/Profile'
import EditProfile from './components/EditProfile/EditProfile'
import AddPost from './components/AddPost/AddPost'
import DisplayPost from './components/DisplayPost/DisplayPost'


function App() {
  const [user,setUser]=useState("")
  const [profile,setProfile]=useState("")


  // console.log(profile);
  
  return (
    
    <BrowserRouter>
      {user && <Nav user={user} setUser={setUser} profile={profile} />}
      <Routes>
        <Route path='/' element={<Home setUser={setUser} setProfile={setProfile} />}/>
        <Route path='/profile' element={<Profile setUser={setUser} profile={profile} setProfile={setProfile}/>}/>
        <Route path='/editprofile' element={<EditProfile setUser={setUser} setProfile={setProfile}/>}/>
        
        <Route path='/addpost' element={<AddPost/>}/>
        <Route path='/displaypost/:id' Component={DisplayPost}/>
        <Route path='/signin' Component={SignIn}/>
        <Route path='/email' Component={Email}/>
        <Route path='/signup' Component={SignUp}/>
      </Routes>

      </BrowserRouter>
    
  )
}

export default App
