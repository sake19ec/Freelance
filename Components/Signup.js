import React from 'react'
import { Link } from 'react-router-dom'
import LoginSignupWays from './LoginSignupWays'
export default function Signup() {
    return (
        <div className="signup">
            <h1>Sign up to 13k13</h1>
            <LoginSignupWays page="signup"/>
            <div className="terms-signup">By continuing, you agree to 13k13's  
                <Link to="/"> Terms of Service</Link> and confirm that you have read 13k13's  <Link to="/">Privacy Policy</Link>.</div>
        </div>
    )
}
