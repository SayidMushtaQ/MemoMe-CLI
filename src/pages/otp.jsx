
import { useRef, useState } from 'react';
import '../styles/otp.css'; 

export default function Verify(){
    const user_email = localStorage.getItem('user_email');
    const [otp,setOtp] = useState(new Array(4).fill(''));
    const otpBoxRef = useRef([]);
    const handleChange = (value,index)=>{
        const newOtps = [...otp];
        newOtps[index] = value;
        setOtp(newOtps);
        
        if(value && index < 3){
            otpBoxRef.current[index + 1].focus()
        }
    }
    
    const handleBackSpaceAndEnterKEY = (e,index)=>{
        if(e.key === 'Backspace' && !e.target.value && index>0){
            otpBoxRef.current[index - 1].focus()
        }
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        
    }
    return(
        <>
        <div className='body'>
        <div className="a1">
        <div className="otp-box">
            <h2>Enter OTP</h2>
            <p>Please enter the 4-digit code sent to your email.</p>
            <form onSubmit={handleSubmit}>
                <div className="box">
                    {otp.map((digit,index)=>(
                        <input type="text" value={digit} key={index} maxLength="1" className="input" onKeyUp={(e)=>handleBackSpaceAndEnterKEY(e,index)} onChange={e=>handleChange(e.target.value,index)} ref={ref=>otpBoxRef.current[index]=ref} required/>
                    ))}
                </div>
                <button type="submit" className="submit">Verify</button>
            </form>
        </div>
    </div>
            </div></>
    )
}