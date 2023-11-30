import React from "react";
import axios from "axios";
// import { useNavigation } from "react-router-dom";
import "../styles/Register.css";
import { registerRoute } from "../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import LoadingSVG from "../components/LoadingSVG";

function Register() {
  const [isShaking, setShaking] = React.useState(false);
  const [success, setSuccess] = React.useState("whatever");
  const [isLoading, setLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    fName: "",
    lName: "",
    address: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const _userInfo = { ...userInfo };
    _userInfo[e.target.name] = e.target.value;
    setUserInfo(_userInfo);
  }

  function startShake() {
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
    }, 100);
  }

  const handleKeyPressed = (e) => {
    if (e.key === "Enter") {
      Register();
    }
  };

  async function Register() {
    const { fName, lName, address, email, password } = userInfo;
    if (
      fName !== "" &&
      lName !== "" &&
      address !== "" &&
      email !== "" &&
      password !== ""
    ) {
      setLoading(true);
      try {
        await axios
          .post(registerRoute, {
            fName,
            lName,
            address,
            email,
            password,
          })
          .then((res) => {
            if (res.data === "Email exists") {
              setSuccess(false);
              startShake();
              setLoading(false);
            } else {
              setSuccess(true);
              setLoading(false);
              setTimeout(() => {
                navigate("/emailverification", {
                  state: { email: email },
                });
              }, 1500);
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Do not leave empty fields!");
    }
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
                onChange={handleChange}
                onKeyDown={handleKeyPressed}
                name="fName"
              />
              <input
                className="reg-lname-input"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                onKeyDown={handleKeyPressed}
                name="lName"
              />
              <input
                className="reg-address-input"
                type="text"
                placeholder="Address"
                name="address"
                onChange={handleChange}
                onKeyDown={handleKeyPressed}
              />
              <input
                className="reg-email-input"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                onKeyDown={handleKeyPressed}
                name="email"
              />
              <input
                className="reg-password-input"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                onKeyDown={handleKeyPressed}
                name="password"
              />
            </div>
            <div className="reg-button-div">
              <button onClick={Register} className="reg-register-button">
                {isLoading ? <LoadingSVG /> : "Register"}
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
                  OTP sent <span className="reg-tick">✓</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
