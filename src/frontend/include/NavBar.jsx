import { useContext } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import UserProfileRight from "./UserProfile";
import { CartContext } from "../Cart/CartContext";
import { IoCartSharp, IoStar } from "react-icons/io5";

function NavBar() {
  return (
    <header className="min-w-[26rem]">
      <NavBarTop />
      <NavBarBottom />
    </header>
  );
}

function NavBarTop() {
  return (
    <div className="h-15 flex items-center justify-between bg-white px-0.5 sm:px-16">
      <div className="flex items-center space-x-2.5 p-3 sm:space-x-5">
        <Link to="/#home">
          <img
            src="../../../images/logo/light/GNS_Horizontal_Black.svg"
            alt="GameNonStop Logo"
            className="h-6 sm:h-[30px]"
          />
        </Link>
        <div className="h-7 w-[1px] rounded bg-slate-300"></div>
        <Link to="/store" className="text-xs font-bold">
          STORE
        </Link>
        <Link to="/support" className="text-xs font-bold text-gray-600">
          Support
        </Link>
        <Link to="/faq" className="text-xs font-bold text-gray-600">
          FAQ
        </Link>
        <Link to="/#about-us" className="text-xs font-bold text-gray-600">
          About Us
        </Link>
      </div>
      <Link to="/profile">
        <UserProfileRight />
      </Link>
    </div>
  );
}

function NavBarBottom() {
  const { cart } = useContext(CartContext);
  return (
    <div className="h-15 flex items-center justify-between bg-gray-100 px-3 sm:px-20 md:px-44">
      <SearchBar />
      <div className="flex items-center space-x-6 p-3 sm:space-x-10">
        <Link to="/cart" className="flex items-center space-x-1">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full">
            <IoCartSharp className="size-6" fill="gray" />
            <span className="absolute right-1/2 top-2/3 flex h-5 items-center justify-center rounded-xl bg-red-500 px-2 text-sm text-white">
              {cart.length}
            </span>
          </div>
          <p className="text-sm font-bold text-gray-600">Cart</p>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
