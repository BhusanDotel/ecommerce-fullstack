import React from "react";
import HomeNav from "../components/Home/HomeNav";
import Board from "../components/Home/Board";
import BusinessCard from "../components/Home/BusinessCard";
import "../styles/Home/Home.css";

function Home() {
  const [isInfoCard, setInfoCard] = React.useState(false);
  const [isGlassRendered, setGlassRendred] = React.useState(false);
  const [isBeerRendered, setBeerRendred] = React.useState(false);
  const [isRendered, setRendered] = React.useState(false);

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

  //to animate image when only fully rendered
  React.useEffect(() => {
    const myImage1 = document.querySelector(".home-img-beerglass");
    const myImage2 = document.querySelector(".home-img-tuborgbeer");

    const handleImage1Load = () => {
      setGlassRendred(true);
    };
    const handleImage2Load = () => {
      setBeerRendred(true);
    };

    if (isBeerRendered && isGlassRendered) {
      setRendered(true);
    }
    // Image is already loaded (possibly from cache)
    if (myImage1 && myImage1.complete && myImage2 && myImage2.complete) {
      setRendered(true);
    } else if (myImage1 && myImage2) {
      // Image is not loaded, add an event listener
      myImage1.addEventListener("load", handleImage2Load);
      myImage2.addEventListener("load", handleImage1Load);
    }

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      if (myImage1 && myImage2) {
        myImage1.removeEventListener("load", handleImage1Load);
        myImage2.removeEventListener("load", handleImage2Load);
      }
    };
  }, []);

  return (
    <>
      <HomeNav />
      <main onClick={closeInfoCard} className="home-root-container">
        <div className={`home-root ${isInfoCard ? "blur" : ""}`}>
          <img
            className={`home-img-beerglass ${
              isRendered ? "home-img-beerglass-animate" : ""
            }`}
            src="/images/homeImg/beer-glass.gif"
            alt=""
          />
          <img
            className={`home-img-tuborgbeer ${
              isRendered ? "home-img-tuborgbeer-animate" : ""
            }`}
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
