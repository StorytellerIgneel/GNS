import video from "../../../assets/videos/gamevid.mp4"; // Import the image
import { Link } from "react-router-dom";

const MainAboutUsSection = () => (
  <section className="section3">
    <div className="game-video">
      <video autoPlay loop src={video} alt="Game Video" />
    </div>
    <div className="distribution-content">
      <h2 className="distribution-title autoShow">
        We are the Best Game Distributors for all Gamers.
      </h2>
      <ul className="distribution-list">
        {/* Add list items */}
        <li className="distribution-item">
          <i className="fa-solid fa-gamepad autoShow"></i>
          <div className="autoShow">
            <div className="distribution-item-title">
              Game Collection Overview
            </div>
            <div className="distribution-item-description">
              Browse our extensive collection of video games, ranging from the
              latest releases to timeless classics. Whether you’re into
              action-packed adventures or relaxing simulations, we have
              something for every gamer.
            </div>
          </div>
        </li>
        {/* Add more list items similarly */}
      </ul>
      <Link to="/store" className="play-button autoShow">
        Discover
      </Link>
    </div>
  </section>
);

export default MainAboutUsSection;
