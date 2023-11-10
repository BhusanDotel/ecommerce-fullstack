import React from "react";
import "../styles/Register.css";

function Register() {
  const [isShaking, setShaking] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  function startShake() {
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
    }, 100);
  }

  function Register() {
    setSuccess(true); // when reg is success
    startShake();
  }

  return (
    <div className="reg-root">
      <img className="reg-logo" src="images/logo-f.png" />
      <div className="reg-div-to-flex">
        <div className={`reg-main ${isShaking ? "reg-shake" : ""}`}>
          <div className="reg-container">
            <div className="reg-logo-div">
              <div className="reg-name-section">
                <p className="reg-logo-text">KINDIM NA TA</p>
              </div>
              <div className="reg-logo-section">
                <img className="reg-mini-logo" src="images/logo-f.png" />
              </div>
            </div>
            <div className="register-here-div">
              <p className="register-here-text">REGISTER HERE</p>
            </div>
            <div className="reg-enter-details-div">
              <p className="reg-enter-details-text">
                Please enter the details below to continue
              </p>
            </div>
            <div className="email-already-use-div">
              {success === false && (
                <p className="reg-email-already-use-text">
                  Email already in use!
                </p>
              )}
            </div>
            <div className="reg-input-div">
              <input
                className="reg-fname-input"
                type="text"
                placeholder="First Name"
              />
              <input
                className="reg-lname-input"
                type="text"
                placeholder="Last Name"
              />
              <input
                className="reg-address-input"
                type="text"
                placeholder="Address"
              />
              <input
                className="reg-email-input"
                type="email"
                placeholder="Email"
              />
              <input
                className="reg-password-input"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="reg-button-div">
              <button onClick={Register} className="reg-register-button">
                REGISTER
              </button>
            </div>
            <div className="reg-already-user-div">
              <p className="reg-already-user-text">
                Already a user?{" "}
                <a className="reg-login-here-text" href="/login">
                  Login
                </a>
                {""} here!
              </p>
            </div>
            <div className="registration-complete-div">
              {success === true && (
                <p className="registration-complete-text">
                  Registration Successfull <span className="reg-tick">✓</span>
                </p>
              )}
            </div>
            {success && (
              <div className="redirecting-to-login-div">
                <p className="redirecting-to-login-text">
                  Redirecting to Login
                </p>
                <img className="loading-icon" src="/images/loading-gif.gif" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
