import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import UserContext from "../pages/LoginContext";
import { Link } from "react-router-dom";

function UserProfileRight() {
  const { user, logoutUser } = useContext(UserContext);

  return (
    <div className="flex items-center space-x-5">
      {user ? (
        <button
          onClick={logoutUser}
          className="button h-auto rounded-full bg-blue-500 px-3 py-1 text-sm hover:bg-blue-600"
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="button h-auto rounded-full bg-red-600 px-3 py-1 text-sm hover:bg-red-700">
            Login
          </button>
        </Link>
      )}
      <p className="hidden text-xs font-bold text-gray-600 md:block">
        {user ? (user.name ? user.name : user.username) : "Guest"}
      </p>
      <div className="flex space-x-2">
        {user ? (
          user.picture ? (
            <img
              className="h-8 w-8 rounded-full border border-gray-100 shadow-sm sm:h-10 sm:w-10"
              src={user.picture}
              alt={user.name}
            />
          ) : (
            <FaUserCircle fill="gray" className="size-8" />
          )
        ) : (
          <FaUserCircle fill="gray" className="size-8" />
        )}
      </div>
    </div>
  );
}

export function UserProfileLeft() {
  const { user } = useContext(UserContext);
  return (
    <div className="flex items-center space-x-5">
      <div className="flex space-x-2">
        {user ? (
          user.picture ? (
            <img
              className="h-8 w-8 rounded-full border border-gray-100 shadow-sm sm:h-10 sm:w-10"
              src={user.picture}
              alt={user.name}
            />
          ) : (
            <FaUserCircle fill="gray" className="size-8" />
          )
        ) : (
          <FaUserCircle fill="gray" className="size-8" />
        )}
      </div>
      <p className="hidden text-xs font-bold text-gray-600 md:block" href="">
        {user ? (user.name ? user.name : user.username) : "Guest"}
      </p>
    </div>
  );
}

export default UserProfileRight;
