import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, signupAction } from '../Actions/UserActions';
import MessageBox from '../Components/MessageBox';

export default function LoginSignupWays({page}) {
    const userLogin = useSelector(state => state.userLogin)
    const [error, setError] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ver_code, setVer_code] = useState("")
    const [msg, setMsg] = useState();
    const dispatch = useDispatch()
    page !== "signup"&&(page="login");
    !userLogin.payload&&(userLogin.payload = {})
    useEffect(()=>{
        setError(userLogin.payload.error);
        setMsg(userLogin.payload.msg);
    },[userLogin.payload])
    const handleLoginForm = (e)=>{
        e.preventDefault();
        if((page==="signup"&&name.length>0 && email.length>0 && password.length>0)||(page!=="signup"&& email.length>0 && password.length>0)){
            dispatch(loginAction({name,email,password,page}))
        }
    }
    const handleSignup = (e)=>{
        e.preventDefault()
        if(ver_code.length>0&&name.length>0){
            dispatch(signupAction({username:name,useremail:email,password,code:ver_code}))
            setName("");
            setPassword("");
            setEmail("");
            setVer_code("");
        }
    }
    const handleShowLogin = ()=>{
        setShowLoginForm(!showLoginForm); 
        userLogin.payload.error=userLogin.payload.msg=null;
        setMsg(null);setError(null)
    }
    if(userLogin.payload.user_id){
        window.location.replace(`https://13k13.com/?user=${userLogin.payload.username}&id=${userLogin.payload.user_id}&picture=${userLogin.payload.userPicture}`)
    }
    return (
    <div className="login-ways">
        {
            showLoginForm?(
            <form className="login-form">
                {error&&(
                    <MessageBox id="message" variant="danger">{error}</MessageBox>
                )}
                {
                msg&&(
                    <MessageBox id="message" variant="success">{msg}</MessageBox>
                )
                }

                <div onClick={handleShowLogin} className="go-back-button">
                    <i className="fa fa-arrow-left fa-2x"></i>
                </div>
                <div className="login-fields">
                    {
                        userLogin.payload.Signup?(
                            <form>
                                <input type="text" className={error&&"input-error"} onChange={e=>setName(e.target.value)} value={name} placeholder="name"/>    
                                <input type="text" className={error&&"input-error"} onChange={e=>setVer_code(e.target.value)} placeholder="6 digit code"/>
                                <button onClick={e=>handleSignup(e)}>
                                    Signup
                                </button>
                            </form>
                        ):(
                            <form>
                                <input type="email"  className={error&&"input-error"} onChange={e=>setEmail(e.target.value)} value={email} placeholder="email" />
                                <div className="login-form-password">
                                    <input placeholder="password" className={error&&"input-error"} type={`${showPassword?"text":"password"}`} value={password} onChange={e=>setPassword(e.target.value)}/>
                                    {password&&password.length>0 && (showPassword?(<span onClick={()=>setShowPassword(!showPassword)}>Hide password</span>):(<span  onClick={()=>setShowPassword(!showPassword)}>Show password</span>))}
                                </div>
                                <div id="login-form-submit">
                                    <button onClick={e=>handleLoginForm(e)}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        )
                    }
                </div>
            </form>
            ):(
            <div className="login-social">
            <div className="login-way">
                <a href={`http://13k13.com/api/login/facebook/${page}`}className="facebook-btn">
                    <div>
                            <i className="fa fa-facebook"/>
                            <p>Continue with Facebook</p>
                    </div>
                </a>    
            </div>
            <div className="login-way">
            <a href={`http://13k13.com/api/login/google/${page}`}className="google-connect">
                <div class="google-btn">
                        <div class="google-icon-wrapper">
                                <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt=""/>
                        </div>
                        <p class="btn-text">Continue with google</p>
                </div>    
            </a>
            </div>
            <div className="login-way" onClick={()=>setShowLoginForm(true)}>
                <div className="login-email">
                    <i className="fa fa-user"></i><p>Use email/password</p>
                </div>  
            </div>
    
             </div>
            )
        }
         </div>
    )
}
