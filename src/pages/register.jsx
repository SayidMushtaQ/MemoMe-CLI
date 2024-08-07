
import { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import '../styles/Signup.css'; 
import signup from "../image/main.jpg"
import {validate} from '../helper/signupValidate.js'
import {ErrorNotify, SuccessNotify} from '../util/notify.js'
import {sendVerifyCode} from '../util/sendVerifyCode.js'
export default function SignUp() {
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
        userName:"",
        email:"",
        password:""
    })
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const handleSubmit = async (e)=>{ 
        e.preventDefault();
        const validationError = validate(formData);

        if(!Object.keys(validationError).length){
            try{
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...formData})
                  });
                  if(!res.ok && res.status==409){
                    return ErrorNotify("User Already Exists, please LOGIN 🐢");
                  }
                  const data = await res.json();

                  if(data.success && res.ok){
                    SuccessNotify("User register Successfully..!!🚀")
                    const {otpRes} = await sendVerifyCode(data.data.email)
                    if(otpRes.ok && otpRes.status === 200){
                         localStorage.setItem('user_email',data.data.email)
                         SuccessNotify("OTP has been sent to your email successfully")
                    }
                    return navigate('/verify')
                  }
            }catch(err){
                console.log(err)
                return ErrorNotify("An error occurred while creating the user. Please try again 🫡🫠")
            }
        }else{
           Object.values(validationError).forEach((error)=> ErrorNotify(error))
        }
    }

    return (
        <div className='body'>
        <div className="container">
            <div className="image-container">
                <img src={signup} alt="" />
               
            </div>
            <div className="signup">
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="userName" className="f1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg> User name
                    </label>
                    <input type="text" id="userName" name="userName" placeholder="User name" onChange={handleChange}/>

                    <label htmlFor="email" className="f1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                        </svg> Email
                    </label>
                    <input type="email" id="email" name="email" placeholder="Enter your Email" onChange={handleChange}/>

                    <label htmlFor="password" className="f1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                        </svg> Password
                    </label>
                    <input type="password" id="password" name="password" placeholder="Password" onChange={handleChange} />

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                        <label className="form-check-label" htmlFor="defaultCheck1" id="t1">
                            I agree all statement in <a href="#" className="a2"><u>Terms of service</u></a>
                        </label>
                        <br /><br />
                    </div>
                    <button className="btn btn-primary" id="register">Register</button>

                    
                    <p id="p1">
                    <Link to={'/'} id="">I am already member</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
    );
}


