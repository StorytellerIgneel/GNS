import "../css/login-style.css";

import React, { useEffect, useState, useRef, useContext } from "react";
import OAuth from "../../backend/OAuth";
import axios from "axios";
import Swal from "sweetalert2";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import UserContext from "./LoginContext";

function LoginPage() {
  const { user, loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const loginForm = useRef();
  const registerForm = useRef();
  const [currentForm, setCurrentForm] = useState("login");
  const [sent, setSent] = useState(false);
  const [login, setLogin] = useState(false);
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [triggerLogin, setTriggerLogin] = useState(false);

  useEffect(() => {
    console.log(username);
  }, [username]);
  useEffect(() => {
    console.log(email);
  }, [email]);
  useEffect(() => {
    console.log(password);
  }, [password]);

  const handleLoginClick = () => {
    console.log(username, password);
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

    // Change button colors
    loginBtn.style.backgroundColor = "#ff3131";
    registerBtn.style.backgroundColor = "rgba(255,255,255,0.2)";

    // Show login form and hide register form
    loginForm.style.left = "10%";
    loginForm.style.opacity = 1;

    registerForm.style.left = "-50%";
    registerForm.style.opacity = 0;

    // Adjust border radius (optional)
    document.querySelector(".col-1").style.borderRadius = "0 10% 30% 0";
  };

  const changeToRegisterForm = () => {
    const loginBtn = document.querySelector("#login");
    const registerBtn = document.querySelector("#register");
    const loginForm = document.querySelector(".login-form");
    const registerForm = document.querySelector(".register-form");

    // Change button colors
    registerBtn.style.backgroundColor = "#ff3131";
    loginBtn.style.backgroundColor = "rgba(255,255,255,0.2)";

    // Show register form and hide login form
    loginForm.style.left = "150%"; // Push login form off screen
    loginForm.style.opacity = 0;

    registerForm.style.left = "50%"; // Bring register form into view
    registerForm.style.opacity = 1;

    // Adjust border radius (optional)
    document.querySelector(".col-1").style.borderRadius = "0 30% 10% 0";
  };

  // const googleLogin = () => {
  //   // call OAuth login function
  //     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //           headers: {
  //               Authorization: `Bearer ${user.access_token}`,
  //               Accept: 'application/json'
  //           }
  //       })
  //       .then((response) => {
  //         if (response.data.success) {
  //           loginUser({username, password});
  //           //console
  //           navigate('/store');  // Navigate to '/store' if successful
  //         } else {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Login Error',
  //             text: response.data.error
  //           }); // Handle the failure case if needed
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }

  const Login = (e) => {
    e.preventDefault();

    console.log("detected login");
    if (username === "" && password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
    } else if (username === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in the username!",
      });
    } else if (password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in the password!",
      });
    } else {
      const url = "http://gns.000.pe/login.php";

      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            let id = response.data.user.id;
            let username = response.data.user.username;
            let email = response.data.user.email;
            loginUser({ id, username, email });
            navigate("/store"); // Navigate to '/store' if successful
          } else {
            Swal.fire({
              icon: "error",
              title: "Login Error",
              text: response.data.error,
            }); // Handle the failure case if needed
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
      setName("");
      setPassword("");
    }
  };

  const Register = (e) => {
    e.preventDefault();

    console.log("detected register");
    console.log(username);
    console.log(email);
    console.log(password);
    if (username === "" && email === "" && password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
    } else if (username === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in the username!",
      });
    } else if (password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in the password!",
      });
    } else if (email === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in the email!",
      });
    } else {
      console.log("register query");
      console.log(username);
      console.log(email);
      console.log(password);
      const url = "http://gns.000.pe/register.php";

      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);

      axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            let id = response.data.user.id;
            let username = response.data.user.username;
            let email = response.data.user.email;
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: response.data.message,
            }); // Handle the failure case if needed
            loginUser({ id, username, email });
            navigate("/store"); // Navigate to '/store' if successful
          } else {
            Swal.fire({
              icon: "error",
              title: "Login Error",
              text: response.data.error,
            }); // Handle the failure case if needed
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
      setName("");
      setEmail("");
      setPassword("");
    }
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
          <div className="col-1">
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
              <img
                src="../../../images/logo/light/GNS_TextOnly_Black.svg"
                alt=""
              />
            </p>
          </div>
          <div className="col-2">
            <div className="btn-box">
              <button
                className="btn btn-1"
                id="login"
                onClick={changeToLoginForm}
              >
                Sign In
              </button>
              <button
                className="btn btn-2"
                id="register"
                onClick={changeToRegisterForm}
              >
                Sign Up
              </button>
            </div>
            <form ref={loginForm} onSubmit={Login} className="login-form">
              <span className="form-title">Sign In</span>
              <div>
                <div className="input-box">
                  <input
                    type="text"
                    className="input-field"
                    name="username"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Username"
                    required
                  />
                  <i className="fa-solid fa-user icon"></i>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    className="input-field"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <i className="fa-solid fa-unlock icon"></i>
                </div>
                <div className="input-submit">
                  <button
                    className={
                      login ? "loginBtn-clicked" : "loginBtn-notClicked"
                    }
                    //onClick={Login}
                  >
                    <span>Sign In </span>
                    <i className="fa-solid fa-right-to-bracket"></i>
                  </button>
                </div>
              </div>
              <OAuth triggerLogin={triggerLogin} />
            </form>
            <form
              ref={registerForm}
              onSubmit={Register}
              className="register-form"
            >
              <span className="form-title">Sign Up</span>
              <div className="form-inputs">
                <div className="input-box">
                  <input
                    type="email"
                    className="input-field"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                  <i className="fa-solid fa-envelope icon"></i>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    className="input-field"
                    name="username"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Username"
                    required
                  />
                  <i className="fa-solid fa-user icon"></i>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    className="input-field"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <i className="fa-solid fa-unlock icon"></i>
                </div>
                <div className="input-submit">
                  <button
                  //onClick={Register}
                  >
                    <span>Sign Up </span>
                    <i className="fa-solid fa-right-to-bracket"></i>
                  </button>
                </div>
              </div>
              <OAuth triggerLogin={triggerLogin} />
            </form>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
