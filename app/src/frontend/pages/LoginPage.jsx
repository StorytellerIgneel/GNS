import "../LoginPage/login-style.css";

import React, { useEffect, useState, useRef} from "react";
import OAuth from "../../backend/OAuth";
import axios from 'axios';
import Swal from 'sweetalert2';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import { GoogleOAuthProvider } from "@react-oauth/google";

function LoginPage() {
  const loginForm = useRef();
  const registerForm = useRef();
  const [currentForm, setCurrentForm] = useState("login");
  const [sent, setSent] = useState(false);
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [triggerLogin, setTriggerLogin] = useState(false);

  const handleLoginClick = () => {
    console.log(name, password)
    setLogin(true);
    setRegister(false);
  };

  const handleRegisterClick = () => {
    console.log("Register");
    setRegister(true);
    setLogin(false);
  };

  const changeToLoginForm = () => {
    const loginBtn = document.querySelector("#login");
    const registerBtn = document.querySelector("#register");
    const loginForm = document.querySelector(".login-form");
    const registerForm = document.querySelector(".register-form");
    loginBtn.style.backgroundColor = "#ff3131";
    registerBtn.style.backgroundColor = "rgba(255,255,255,0.2)";

    loginForm.style.left = "10%";
    registerForm.style.left = "-50%";

    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;

    document.querySelector(".col-1").style.borderRadius = "0 10% 30% 0";
  }

  const changeToRegisterForm = () => {
    const loginBtn = document.querySelector("#login");
    const registerBtn = document.querySelector("#register");
    const loginForm = document.querySelector(".login-form");
    const registerForm = document.querySelector(".register-form");
    registerBtn.style.backgroundColor = "#ff3131";
    loginBtn.style.backgroundColor = "rgba(255,255,255,0.2)";

    loginForm.style.left = "150%";
    registerForm.style.left = "60%";

    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;

    document.querySelector(".col-1").style.borderRadius = "0 30% 10% 0";
  }

  const googleLogin = () => {
    // call OAuth login function
    setTriggerLogin(true);
  }

  const Login = (e) => {
    e.preventDefault();

    if (name === "" && email === "" && password === ""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!'
      });
    }
    else {
      Swal.fire({
        title: 'Are you sure you want to submit?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Yes, Submit",
        cancelButtonText: "No"
      }).then((result) => {
        Swal.fire("Submitted!", "Your message has been sent to the customer service team.", "success")
    })
    }
    
    const url = "http://localhost:8000/backend/php/login.php";
    
    let formData = new FormData();
    formData.append('user_name', name);
    formData.append('user_email', email);
    formData.append('user_message', password);
    
    axios.post(url, formData)
    .then((response) => alert(response.data)) 
    .catch(error => alert(error.message))
  };

  return (
    <GoogleOAuthProvider clientId="721278939294-754epiosjucfqahjktvlnt89f7j8o42b.apps.googleusercontent.com">
      <div className="login-page-body">
        <Helmet>
            <title>GameNonStop | Login & Register</title>
            <link
              href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
              integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
              crossorigin="anonymous"
              referrerpolicy="no-referrer"
            />
          </Helmet>
            <div className="form-container">
              <div className="col col-1">
                <div className="image-layer">
                  <img
                    src="../../../images/login-images/guy-playing-pc.png"
                    className="form-image-main pcguy"
                  />
                  <img
                    src="./../../images/login-images/login-controller.png"
                    className="form-image controller"
                  />
                  <img
                    src="./../../images/login-images/PSsymbol.png"
                    className="form-image symbol"
                  />
                </div>
                <p className="featured-words">
                  You Are Few Minutes A Way To Get Your Favourite Games on{" "}
                  <span>GameNonStop</span>
                </p>
              </div>
              <div className="col col-2">
                <div className="btn-box">
                  <button className="btn btn-1" id="login" onClick={changeToLoginForm}>
                    Sign In
                  </button>
                  <button className="btn btn-2" id="register" onClick={changeToRegisterForm}>
                    Sign Up
                  </button>
                </div>
                <form ref={loginForm} onSubmit={Login} className="login-form">
                <div className="login-form">
                  <div className="form-title">
                    <span className="title">Sign In</span>
                  </div>
                  <div className="form-inputs">
                    <div className="input-box">
                      <input
                        type="text"
                        className="input-field"
                        name = "username"
                        onChange = {(e) => setName(e.target.value)}
                        placeholder="Username"
                        required
                      />
                      <i className="fa-solid fa-user icon"></i>
                    </div>
                    <div className="input-box">
                      <input
                        type="password"
                        className="input-field"
                        name = "password"
                        onChange = {(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                      <i className="fa-solid fa-unlock icon"></i>
                    </div>
                    <div className="input-box submit">
                      <button className={login? "loginBtn-clicked" : "loginBtn-notClicked"
                      } onClick={handleLoginClick}>
                        <span>Sign In</span>
                        <i className="fa-solid fa-right-to-bracket"></i>
                      </button>
                    </div>
                  </div>
                  <div className="social-login">
                    <i className="fa-brands fa-google"></i>
                  </div>
                </div>
                </form>
                <form ref={registerForm} onSubmit={Login} className="register-form">
                <div className="register-form">
                  <div className="form-title">
                    <span className="title">Sign Up</span>
                  </div>
                  <div className="form-inputs">
                    <div className="input-box">
                      <input
                        type="email"
                        className="input-field"
                        name = "email"
                        onChange = {(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                      />
                      <i className="fa-solid fa-envelope icon"></i>
                    </div>
                    <div className="input-box">
                      <input
                        type="text"
                        className="input-field"
                        name = "username"
                        onChange = {(e) => setName(e.target.value)}
                        placeholder="Username"
                        required
                      />
                      <i className="fa-solid fa-user icon"></i>
                    </div>
                    <div className="input-box">
                      <input
                        type="password"
                        className="input-field"
                        name = "password"
                        onChange = {(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                      <i className="fa-solid fa-unlock icon"></i>
                    </div>
                    <div className="input-box submit">
                      <button onClick={handleLoginClick}>
                        {/* <span>Sign Up</span> */}
                        <i className="fa-solid fa-right-to-bracket"></i>
                      </button>
                    </div>
                  </div>
                  <div className="social-login">
                    <i className="fa-brands fa-google" onClick={googleLogin}></i>
                    <OAuth triggerLogin={triggerLogin} />
                  </div>
                </div>
                </form>
              </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
