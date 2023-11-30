import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { otpRoute } from "../Utils/APIRoutes";
import "../styles/EmailVerification.css";

function EmailVerification() {
  const [isVerified, setVerified] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let email = "";
  if (location.state) {
    email = location.state.email;
  }

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleKeyPressed = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = async () => {
    await axios.post(otpRoute, { email, otp }).then((res) => {
      if (res.data) {
        if (res.data === "verified") {
          setVerified(true);
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else if (res.data === "invalid otp") {
          alert("Invalid OTP");
        }
      }
    });
  };

  React.useEffect(() => {
    if (email === "") {
      navigate("/register");
    }
  }, []);

  return (
    <>
      <div className="emailverify-container">
        <div className="emailverify-root">
          <h2 className="emailverify-title">Enter the otp</h2>
          <h6 className="emailverify-subtitle">
            We have sent OTP to : {email}
          </h6>
          <input
            name="otp"
            value={otp}
            onChange={handleChange}
            onKeyDown={handleKeyPressed}
            className="emailverify-input"
            type="text"
            placeholder="OTP"
          />
          <button onClick={handleClick} className="emailverify-button">
            Submit
          </button>
          {isVerified && (
            <p className="emailverified-success">Verification complete!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default EmailVerification;
