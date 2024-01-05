import React from "react";
import "../../styles/Home/BusinessCard.css";

function BusinessCard() {
  const toFacebook = () => {
    window.location.href =
      "https://www.facebook.com/profile.php?id=100009028581010";
  };
  const toInsta = () => {
    window.location.href = "https://www.instagram.com/bhusan_dotel/";
  };
  const toTwitter = () => {
    window.location.href = "https://twitter.com/BhusanDotel";
  };
  return (
    <businesscard className="businesscard-root">
      <div className="businesscard-left-section">
        <div className="address-div">
          <img
            className="contact-icon navpin-icon"
            src="/images/homeImg/navpin-icon.png"
            alt="nav-icon"
          />
          <p>Bhaktapur, Biruwa</p>
        </div>
        <div className="phone-div">
          <img
            className="contact-icon phone-icon"
            src="/images/homeImg/telephone-icon.png"
            alt="tel-icon"
          />
          <p>+977-9869102440</p>
        </div>
        <div className="email-div">
          <img
            className="contact-icon wood-email-icon"
            src="/images/homeImg/email-icon.png"
            alt="mail-icon"
          />
          <p>dotelbhusan0@gmail.com</p>
        </div>
      </div>

      <div className="businesscard-right-section">
        <p className="businesscard-about-us-text">
          Explore a variety of beverages at kindim na ta! Whether it's a big
          event or an individual order, we have diverse options for every taste.
          Count on us for quality drinks to enhance any occasion. Cheers to
          unforgettable experiences!
        </p>
        <div className="businesscard-social-links">
          <img
            onClick={toFacebook}
            className="social-links-icon fb-icon"
            src="/images/homeImg/fbwood-icon.png"
            alt="fb-icon"
          />
          <img
            onClick={toInsta}
            className="social-links-icon insta-icon"
            src="/images/homeImg/instawood-icon.png"
            alt="fb-icon"
          />
          <img
            onClick={toTwitter}
            className="social-links-icon twitter-icon"
            src="/images/homeImg/twitterwood-icon.png"
            alt="fb-icon"
          />
        </div>
      </div>
    </businesscard>
  );
}

export default BusinessCard;
