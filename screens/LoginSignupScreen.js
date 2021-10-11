import React, { useState } from 'react'
import Signup from '../Components/Signup'
import Login from '../Components/Login'


export default function LoginSignupScreen() {
    const [toggleSignupLogin, setToggleSignupLogin] = useState(false)
    return (
        <div className="login-signup-screen">
        <div className="login-signup">
            {toggleSignupLogin?<Signup/>:<Login/>}
            <div className="dont-have-an-account">
                {toggleSignupLogin?(
                    <p>Already have an account? <span onClick={()=>setToggleSignupLogin(false)}>Log in</span></p>
                    ):(
                        <p>Don't have an account? <span onClick={()=>setToggleSignupLogin(true)}>Sign Up</span></p>
                    )}
            </div>
        </div>
        </div>
    )
}
