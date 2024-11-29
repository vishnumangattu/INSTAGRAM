import React from 'react'
import './Password.scss'

const Password = () => {
  return (
    <>
     <div className="form-container">
        <h2>Create Password </h2>
        <form id="registrationForm">
            <div className="form-group">
                <label >Password</label>
                <input type="password" id="password" name="password" placeholder="Enter Password" required/>
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required/>
                <span id="passwordError" className="error"></span>
            </div>
            <button type="submit" className="submit-btn" id="submitBtn">Submit</button>
        </form>
    </div>
    
    </>
  )
}

export default Password