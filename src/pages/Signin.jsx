
import {Link} from 'react-router-dom'
import '../styles/Signin.css'; 
import signin from "../image/main_2.jpg"
import {useState} from 'react'
import {validate} from '../helper/signinValidate'
import {notify} from '../util/notify.js'
export default function Signin() {
    const [formData,setFormData] = useState({
        userInput:"",
        password:""
    })
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const handleSubmit = (e)=>{ 
        e.preventDefault();
        const validationError = validate(formData)
        if(!Object.keys(validationError).length){
            //TODO: Send data into server
            console.log("Ok")
        }else{
           Object.values(validationError).forEach((error)=> notify(error))
        }
    }

    return (
        <>
        <div className='body'>
            <div className="container">
                <div className="image-container">
                    <img src={signin} alt="" />
                </div>
                <div className="signin">
                    <h1>Sign in</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg> Username or email
                        </label>
                        <input type="text" id="userInput" name="userInput" placeholder="Enter your name" onChange={handleChange} />

                        <label htmlFor="password">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                            </svg>&nbsp; Password
                        </label>
                        <input type="password" id="password" name="password" placeholder="Password" onChange={handleChange} />

                        <div className="remember-me">
                            <input type="checkbox" id="remember" name="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>

                        <button type="submit">Log in</button>
                    </form>
                    <div className="account">
                        {/* <p><a href="#">Create an account</a></p> */}
                        <p><Link to={'/SignUp'} id="SignUp">Create an account</Link></p>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

