import { useEffect, useRef, useState } from "react";
import axios from "axios"; // Axios for API calls
import "../css/Carousel.css";
import { Link, useNavigate } from "react-router-dom";

const RADIUS = 1200;
const FLIP_RANGE = 3;

const CarouselFlow = () => {
  const [imageData, setImageData] = useState([]); // To store the fetched images
  const [currentIndex, setCurrentIndex] = useState(0); // Carousel's current index
  const [currentAngle, setCurrentAngle] = useState(0); // Carousel's current angle
  const el = useRef(null);
  const navigate = useNavigate(); // For redirecting to the product page

  // Helper function to set element style transform property
  function setTransform(el, xpos, zpos, angle, flipAngle) {
    el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${angle}deg) rotateX(${flipAngle}deg)`;
  }

  // Fetch games from the database
  useEffect(() => {
    axios
      .get("http://gns.000.pe/carousel_get_game.php")
      .then((response) => {
        setImageData(response.data); // Store the image data in state
        if (response.data.length > 0) {
          const angleUnit = 360 / response.data.length; // Calculate angle between items
          setCurrentIndex(0); // Reset the index and angle
          setCurrentAngle(0); // Reset the angle
          target(0, angleUnit, true); // Target the first item (centered)
        }
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  // Target an item and make it center
  function target(index, angleUnit, initial = false) {
    if (!initial && index === currentIndex) {
      // Redirect to the product page if the center image is clicked
      navigate(`/store/${imageData[index].game_id}`);
      return;
    }

    // Calculate the amount of angle to shift based on the clicked index
    let deltaAngle = -(index - currentIndex) * angleUnit;
    if (deltaAngle < -180) deltaAngle += 360;
    else if (deltaAngle > 180) deltaAngle -= 360;

    setCurrentAngle((prevAngle) => prevAngle + deltaAngle); // Update the current angle
    setCurrentIndex(index); // Update the current index

    // Rotate the carousel container
    const cf = el.current;
    cf.style.transform = `translateZ(-1250px) rotateY(${currentAngle + deltaAngle}deg)`;

    // Flip items angle
    let flipAngle = 90;
    const items = cf.children;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemAngle = angleUnit * i;
      const itemAngleRad = (itemAngle * Math.PI) / 180;
      const xpos = Math.sin(itemAngleRad) * RADIUS;
      const zpos = Math.cos(itemAngleRad) * RADIUS;

      let deltaIndex = Math.abs(i - index);
      if (deltaIndex > cf.children.length / 2) {
        deltaIndex = cf.children.length - deltaIndex;
      }
      if (deltaIndex <= FLIP_RANGE) {
        flipAngle = deltaIndex * (90 / FLIP_RANGE);
      } else flipAngle = 90;
      setTransform(item, xpos, zpos, itemAngle, flipAngle); // Apply transform
    }
  }

  return (
    <div>
      <div className="carousel-container">
        <div className="carouselflow" ref={el}>
          {imageData.map((game, index) => (
            <div
              key={game.game_id}
              onClick={() => {
                if (index === currentIndex) {
                  // Redirect to product page if it's the center image
                  navigate(`/store/${game.game_id}`);
                } else {
                  // Rotate the carousel if it's not the center image
                  target(index, 360 / imageData.length);
                }
              }}
              style={{ backgroundImage: `url(${game.img_src})` }}
              className="carouselflow-item"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselFlow;
