import "../styles/forgot-password.css";
export default function ForgotPassword() {
  return (
    <div className="reset-main-container">
      <div className="reset-container">
        <form action="">
          <h1>Reset Password</h1>
          <input
            type="password"
            id="password"
            placeholder="Enter new password"
          />
          <button>Reset Password</button>
        </form>
      </div>
    </div>
  );
}
