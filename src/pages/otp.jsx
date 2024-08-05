
import '../styles/otp.css'; 

export default function Verify(){
    return(
        <>
        <div className='body'>
        <div className="a1">
        <div className="otp-box">
            <h2>Enter OTP</h2>
            <p>Please enter the 6-digit code sent to your email.</p>
            <form action='http://localhost:5173/Home' method='get'>
                <div className="box">
                    <input type="text" maxLength="1" className="input" required/>
                    <input type="text" maxLength="1" className="input" required/>
                    <input type="text" maxLength="1" className="input" required/>
                    <input type="text" maxLength="1" className="input" required/>
                    <input type="text" maxLength="1" className="input" required/>
                    <input type="text" maxLength="1" className="input" required/>
                </div>
                <button type="submit" className="submit">Verify</button>
            </form>
        </div>
    </div>
            </div></>
    )
}