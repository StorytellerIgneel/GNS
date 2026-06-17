import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import MainHeader from "./main/MainHeader";
import MainHomeSection from "./main/MainHomeSection";
import MainPlayableGamesSection from "./main/MainPlayableGamesSection";
import MainAboutUsSection from "./main/MainAboutUs";
import Footer from "../include/Footer";
import "../css/style.css";
import MainRatingSection from "./main/MainRatingSection";

function MainPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="main-page-body">
      {/* <MainHeader /> */}
      <section id="home">
        <MainHomeSection />
      </section>
      <section id="play" className="w-screen">
        <MainPlayableGamesSection />
      </section>
      <section id="about-us">
        <MainAboutUsSection />
        <MainRatingSection />
      </section>
      <Footer />
    </div>
  );
}

export default MainPage;
