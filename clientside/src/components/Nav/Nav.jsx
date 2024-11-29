import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './Nav.scss'
import user_icon from './person.png'


const Nav = ({user,setUser,profile}) => {
const navigate=useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const token = localStorage.getItem('Token');
  return (
    <div className="nav">
    <nav>
    <h3>INSTAGRAM</h3>

    <input className="input" name="text" placeholder='Type Here for .....' type="search" />
    {!token ? (
    <Link to={'/login'}>
    <div className="log">
      <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" alt="" /><p>Login</p>
    </div></Link> ) : (
    <div className='detail'>
    <div className="user-info">
  <h1>{user}</h1>
    </div>
    <div className="image">
      <img className='profile' src={profile?profile:user_icon} alt="" onClick={toggleDropdown} />
      <div className="profile-dropdown">   
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                 <Link to={'/profile'}> <div>Profile</div></Link>
                </li>
                <li>
                 <button className='logout' onClick={()=>{

                  localStorage.removeItem('Token')
                  setUser("")
              navigate('/signin')
            }}>LOGOUT</button>
                </li>
              </ul>
              )}
              </div>
   </div>
   </div>
    )}
  </nav>
  </div>
  )
}

export default Nav