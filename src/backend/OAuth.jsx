import React, { useState, useEffect, useContext } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import UserContext from "../frontend/pages/LoginContext";
import "../frontend/css/login-style.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function OAuth({ triggerLogin }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const { loginUser } = useContext(UserContext);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (triggerLogin) {
      login();
    }
  }, [triggerLogin, login]);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          },
        )
        .then((res) => {
          let original_response = res.data;
          console.log(user.access_token);
          //console.log(res.data);
          let email = res.data.email;
          let username = res.data.name;
          let picture = res.data.picture;

          const url = "http://gns.000.pe/googleLogin.php";

          let formData = new FormData();
          formData.append("username", username);
          formData.append("email", email);
          formData.append("picture", picture);

          axios
            .post(url, formData)
            .then((response) => {
              console.log(response.data);
              if (response.data.success) {
                let id = response.data.user.id;
                let username = response.data.user.username;
                let email = response.data.user.email;
                let picture = response.data.user.picture;
                Swal.fire({
                  icon: "success",
                  title: "Success!",
                  text: response.data.message,
                }); // Handle the failure case if needed
                setProfile(original_response);
                loginUser({ id, username, email, picture });
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
        })
        .catch((err) => console.log(err));
    }
  }, [loginUser, navigate, user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      {/* {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut} className='button bg-black px-3'>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()} className='button bg-black px-3'>Sign in with Google 🚀 </button>
            )} */}
      <div className="social-login">
        <i className="fa-brands fa-google" onClick={() => login()}></i>
      </div>
    </div>
  );
}
export default OAuth;
