import React, { useState, useEffect, useContext } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import UserContext from '../frontend/pages/LoginContext';
import "../frontend/css/login-style.css"
import axios from 'axios';

function OAuth({ triggerLogin }) {
    const [ user, setUser ] = useState(null);
    const [ profile, setProfile ] = useState(null);

    const { loginUser } = useContext(UserContext);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (triggerLogin) {
            login();
        }
    }, [triggerLogin, login]);

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        loginUser(res.data);
                        console.log(user.access_token);
                        console.log(res.data);
                        email = res.data.email;
                        name = res.data.name;
                    })
                    .catch((err) => console.log(err));
            }
        },
        [loginUser, user]
    );

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
            <div className='social-login'>
            <i className="fa-brands fa-google" onClick={() => login()}></i>

            </div>
        </div>
    );
}
export default OAuth;