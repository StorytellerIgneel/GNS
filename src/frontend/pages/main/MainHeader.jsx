import "../../css/MainHeader.css"; // Import the header-specific CSS
import logo from "../../../assets/images/GNS_Horizontal_Black.svg"; // Import the image
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const MainHeader = () => (
  <div>
    <header className="main-page-header">
      <img src={logo} alt="GNSlogo" width="250vw" />
      <nav>
        <ul>
          <li>
            {" "}
            <a href="#">Shop</a>
          </li>
          <li>
            {" "}
            <a href="#About Us">About us</a>
          </li>
          <li>
            {" "}
            <a href="FAQ.php">FAQ</a>
          </li>
          <Link to="/login" className="active">
            Login <i className="fa-solid fa-user"></i>
          </Link>
        </ul>
      </nav>
    </header>
  </div>
);

export default MainHeader;
