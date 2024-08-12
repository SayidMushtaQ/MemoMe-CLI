import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
export default function Profile({email,userName}) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    localStorage.removeItem('authToken');
    navigate('/login')
  }
  return (
    <li className="use">
      <Link to={"/"} id="Signin">
        User
      </Link>
      &nbsp;&nbsp;
      <button
        aria-labelledby="user"
        style={{ background: "none", border: "none", color: "white" }}
        onClick={() => setShow(!show)}
      >
        <i className="fa-solid fa-circle-user"></i>
      </button>
      {show && (
        <div
          style={{
            position: "absolute",
            background: "white",
            color: "black",
            border: "1px solid black",
            borderRadius: "10px",
            padding: "10px",
            width:"20rem",
            right:'50px'
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "20px",
            }}
          >
            <b>User name:</b>
            <span>{userName}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "20px",
            }}
          >
            <b>Email: </b>
            <span>{email}</span>
          </div>
          <button
            style={{
              padding: "5px 10px",
              fontSize: "16px",
              color: "white",
              backgroundColor: "#e74c3c",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={()=>handleLogOut()}
          >
            Log out
          </button>
        </div>
      )}
    </li>
  );
}
