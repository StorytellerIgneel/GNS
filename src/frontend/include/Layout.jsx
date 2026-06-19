import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Gemini from "../AI/Gemini";
import { FaFacebookMessenger } from "react-icons/fa";

function Layout() {
  let hide = {
    display: "none",
  };

  let show = {
    display: "block",
  };

  const [chatopen, setChatOpen] = useState(false);
  const toggle = () => {
    setChatOpen(!chatopen);
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main className="layout-container">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>

      {/* Toggle Button */}
      <button
        onClick={toggle}
        className="fixed bottom-[3%] right-[2%] rounded-full bg-blue-500 px-4 py-2 text-white"
      >
        {chatopen ? (
          "Hide Gemini"
        ) : (
          <FaFacebookMessenger className="size-7" fill="white" />
        )}
      </button>

      <div
        style={chatopen ? show : hide}
        className="fixed bottom-[3%] right-[2%] h-[45%] w-[25%] overscroll-y-auto shadow-lg"
      >
        <button
          style={chatopen ? show : hide}
          onClick={toggle}
          className="absolute right-2 top-2 z-20 p-2 text-gray-500"
        >
          x
        </button>

        <Gemini />
      </div>
    </div>
  );
}

export default Layout;
