import React from "react";
import "../styles/Login.css";

function Login() {
  const [isShaking, setShaking] = React.useState(false);
  const [isUser, setUser] = React.useState(false);

  function loginFail() {
    setUser(true);
    setTimeout(() => {
      setUser(false);
    }, 3000);
  }

  function startShake() {
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
    }, 100);
  }

  function Login() {
    loginFail();
    startShake();
  }
  return (
    <div className="login-root">
      <img className="logo" src="images/logo-f.png" />
      <div className="div-to-flex">
        <div className={`login-main ${isShaking ? "shake" : ""}`}>
          <div className="logo-div">
            <div className="name-section">
              <p className="logo-text">KINDIM NA TA</p>
            </div>
            <div className="logo-section">
              <img className="mini-logo" src="images/logo-f.png" />
            </div>
          </div>
          <div className="container">
            <div className="image-div">
              <img className="bottles-img" src="images/bottles.png" />
            </div>
            <div className="login-text-div">
              <p className="login-text">Login Now</p>
            </div>
            <div className="enter-text-div">
              <p className="enter-details">
                Please enter the details below to continue
              </p>
            </div>
            <div className="login-fail-div">
              {isUser && (
                <p className="login-fail-text">
                  I couldn't recognize you. Try again!
                </p>
              )}
            </div>
            <div className="input-div">
              <img className="email-icon" src="images/email-icon.jpg" />
              <input className="email-input" type="email" placeholder="Email" />
              <img className="password-icon" src="images/password-icon.png" />
              <input
                className="password-input"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="forget-password-div">
              <p className="forget-password">Forgot Password?</p>
            </div>
            <div className="button-div">
              <button className="login-button" onClick={Login}>
                LOGIN
              </button>
            </div>
            <div className="new-user-div">
              <p className="new-user">
                New User?{" "}
                <a className="register" href="/register">
                  Register
                </a>{" "}
                Here!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
