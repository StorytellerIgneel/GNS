import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [localuser, setLocalUser] = useState("");

  // const getUserFromLocalStorage = (user) => {
  //   const storedUser = localStorage.getItem(`user_${user.id}`);
  //   return storedUser ? JSON.parse(storedUser) : null;
  // };

  // useEffect(() => {
  //   // Retrieve user info from localStorage on component mount
  //   //const storedUser = JSON.parse(localStorage.getItem('user'));
  //   if (storedUser) {
  //     setUser(storedUser);
  //   }
  // }, []);

  // useEffect(() => {
  //   if(userSet)
  //     setLocalUser(getUserFromLocalStorage)
  // }, [userSet])

  // useEffect(() => {
  //   const storedUser = getUserFromLocalStorage();
  //   if (storedUser) {
  //     setUser(storedUser);
  //   }
  // }, []);

  useEffect(() => {
    if (user) {
      // Save the logged-in user to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("cart", JSON.stringify([]));
      setLocalUser(`user_${user.id}`);
      console.log(localuser);
      // setUserSet(true);
      // console.log(localuser);
    } else {
      // Clear the user from localStorage when logged out
      // localStorage.removeItem('user');
      // localStorage.removeItem("cart"); // Clear associated cart as well
      // // Update localStorageUser when user logs out
      // setLocalStorageUser(null);
    }
  }, [localuser, user]);

  // Function to handle user login
  const loginUser = (userInfo) => {
    setUser(userInfo);
    console.log(userInfo);
  };

  // Function to handle user logout
  const logoutUser = () => {
    setUser(null);
    console.log("User logged out");
  };

  return (
    <UserContext.Provider value={{ localuser, user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
