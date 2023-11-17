import React from "react";
import HomeNav from "../components/Home/HomeNav";
import Board from "../components/Home/Board";
import BusinessCard from "../components/Home/BusinessCard";
import "../styles/Home/Home.css";

function Home() {
  const [isInfoCard, setInfoCard] = React.useState(false);

  const toggleInfoCard = () => {
    setInfoCard((prevState) => {
      return !prevState;
    });
  };

  const closeInfoCard = () => {
    if (isInfoCard === true) {
      setInfoCard((prevState) => {
        return !prevState;
      });
    }
  };
  ``;
  return (
    <>
      <HomeNav />
      <main onClick={closeInfoCard} className="home-root-container">
        <div className={`home-root ${isInfoCard ? "blur" : ""}`}>
          <img
            className="home-img-beerglass"
            src="/images/homeImg/beer-glass.gif"
            alt=""
          />
          <img
            className="home-img-tuborgbeer"
            src="/images/homeImg/tuborg_beer.png"
            alt=""
          />
          <img
            onClick={toggleInfoCard}
            style={{ cursor: "pointer" }}
            className="home-img-about-mini"
            src="/images/homeImg/about-us-mini.png"
            alt=""
          />
          <div className="home-board-container">
            <Board />
          </div>
        </div>
        {isInfoCard && (
          <div className="about-me-popup">
            <BusinessCard />
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
