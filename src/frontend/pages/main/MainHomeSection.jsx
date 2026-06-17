import guy_playing_pc from "../../../assets/images/guy-playing-pc.png"; // Import the image
import { Link } from "react-router-dom";

const MainHomeSection = () => (
  <section className="section1 home">
    <div className="home-text">
      <h1>Welcome to</h1>
      <img src="../../../../images/logo/light/GNS_Horizontal2_Black.svg" />
      <br />
      <p>
        &#34;At <span style={{ color: "red" }}>GNS</span>, we bring the gaming
        world to your fingertips. Explore our vast collection of the latest
        releases, timeless classics, and exclusive deals on your favorite games.
        Join our community of passionate gamers and elevate your gaming
        experience with <span style={{ color: "red" }}>GNS</span>!&#34;
      </p>
      <div className="home-buttons">
        <Link to="/store" className="discover-button autoShow">
          Discover
        </Link>
        <button
          className="play-button"
          onClick={() => document.getElementById("play").scrollIntoView()}
        >
          <i className="fa-solid fa-play"></i> Play
        </button>
      </div>
    </div>
    <div className="home-img">
      <img src={guy_playing_pc} alt="Guy playing PC" />
    </div>
  </section>
);

export default MainHomeSection;
