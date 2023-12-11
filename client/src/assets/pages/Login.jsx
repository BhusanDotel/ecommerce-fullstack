import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { loginRoute } from "../Utils/APIRoutes";
import LoadingSVG from "../components/LoadingSVG";

function Login() {
  const [isShaking, setShaking] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isUser, setUser] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const _userInfo = { ...userInfo };
    _userInfo[e.target.name] = e.target.value;
    setUserInfo(_userInfo);
  }

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

  const handleKeyPressed = (e) => {
    if (e.key === "Enter") {
      Login();
    }
  };

  async function Login() {
    const { email, password } = userInfo;
    if (email !== "" && password !== "") {
      setLoading(true);
      try {
        await axios
          .post(loginRoute, {
            email,
            password,
          })
          .then((res) => {
            if (res.data === "not exists") {
              loginFail();
              startShake();
              setLoading(false);
            } else if (res.data === "not verified") {
              alert("Email not verified");
              navigate("/emailverification", {
                state: { email: email },
              });
            } else {
              if (res.data.user) {
                const authToken = res.data.user.authToken_user;
                const firstName = res.data.user.firstName;
                const lastName = res.data.user.lastName;
                localStorage.setItem("authToken_user", authToken);
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("lastName", lastName);
                localStorage.setItem("email", email);
                navigate("/");
                location.reload();
              } else if (res.data.admin) {
                const authToken = res.data.admin.authToken_admin;
                const firstName = res.data.admin.firstName;
                const lastName = res.data.admin.lastName;
                localStorage.setItem("authToken_admin", authToken);
                localStorage.setItem("authToken_user", authToken);
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("lastName", lastName);
                localStorage.setItem("email", email);
                navigate("/admin-dashboard");
                location.reload();
              }
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Fill all Fields!");
    }
  }
  return (
    <div className="login-root">
      <img className="logo" src="/images/logo-f.png" />
      <div className="div-to-flex">
        <div className={`login-main ${isShaking ? "shake" : ""}`}>
          <div className="logo-div">
            <div className="name-section">
              <p className="logo-text">KINDIM NA TA</p>
            </div>
            <div className="logo-section">
              <img className="mini-logo" src="/images/logo-f.png" />
            </div>
          </div>
          <div className="container">
            <div className="image-div">
              <img className="bottles-img" src="/images/bottles.png" />
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
              <img className="email-icon" src="/images/email-icon.jpg" />
              <input
                className="email-input"
                name="email"
                onChange={handleChange}
                onKeyDown={handleKeyPressed}
                type="email"
                placeholder="Email"
              />
              <img className="password-icon" src="/images/password-icon.png" />
              <input
                className="password-input"
                type="password"
                name="password"
                onChange={handleChange}
                onKeyDown={handleKeyPressed}
                placeholder="Password"
              />
            </div>
            <div className="forget-password-div">
              <p className="forget-password">Forgot Password?</p>
            </div>
            <div className="button-div">
              <button className="login-button" onClick={Login}>
                {isLoading ? <LoadingSVG /> : "Login"}
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
