import guy_playing_pc from '../../../assets/images/guy-playing-pc.png'; // Import the image

const MainHomeSection = () => (
  <section className="section1 home">
    <div className="home-text">
      <h1>Welcome to <span style={{ color: 'black' }}>Game</span><span style={{ color: '#E81C24' }}>NonStop</span></h1>
      <p>&#34;At <span style={{ color: 'red' }}>GNS</span>, we bring the gaming world to your fingertips. Explore our vast collection of the latest releases, timeless classics, and exclusive deals on your favorite games. Join our community of passionate gamers and elevate your gaming experience with <span style={{ color: 'red' }}>GNS</span>!&#34;</p>
      <button className="discover-button">Discover</button>
      <button className="play-button" onClick={() => document.getElementById('play').scrollIntoView()}>
        <i className="fa-solid fa-play"></i> Play
      </button>
    </div>
    <div className="home-img">
      <img src={guy_playing_pc} alt="Guy playing PC"/>
    </div>
  </section>
);

export default MainHomeSection;