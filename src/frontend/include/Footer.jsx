import "../css/footer.css"; // Import the footer-specific CSS
import { Link } from "react-router-dom";
import footer_logo from "../../assets/images/GNS_Horizontal_White.svg"; // Import the image
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Link to="/#home">
            <img src={footer_logo} alt="" />
          </Link>
        </div>
        <nav className="footer-nav">
          <Link to="/#home">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/#about-us">About</Link>
          <Link to="/support">Support</Link>
        </nav>
        <div className="footer-social">
          {/* <a href="https://www.twitter.com/gamenonstop"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="https://www.facebook.com/gamenonstop"><i className="fa-brands fa-square-facebook"></i></a>
            <a href="https://www.instagram.com/gamenonstop"><i className="fa-brands fa-instagram"></i></a> */}
          {/* X */}

          <a
            href="https://x.com/gamenonstop"
            className="flex items-center space-x-3 text-lg text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Custom X icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24" // Adjust size as needed
              height="24"
              fill="currentColor"
              className="bi bi-twitter-x text-2xl"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/gamenonstop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-lg text-blue-500 hover:underline"
          >
            <i className="bi bi-facebook text-2xl"></i>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/gamenonstop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-lg text-blue-500 hover:underline"
          >
            <i className="bi bi-instagram text-2xl"></i>
          </a>
        </div>
        <div className="footer-copy">
          <p>
            &copy; 2024 All rights reserved | This website is made with{" "}
            <i className="fa fa-heart"></i> by GameNonStop
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
