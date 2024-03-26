import React from "react";
import "../../styles/Home/BusinessCard.css";

function BusinessCard() {
  const toFacebook = () => {
    window.location.href =
      "https://www.facebook.com/abhi.pok/";
  };
  const toInsta = () => {
    window.location.href = "https://www.instagram.com/_darkside_of_the_moon/";
  };
  const toTwitter = () => {
    window.location.href = "https://twitter.com/abhishake789";
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
          <p>Lubhu, Lalitpur</p>
        </div>
        <div className="phone-div">
          <img
            className="contact-icon phone-icon"
            src="/images/homeImg/telephone-icon.png"
            alt="tel-icon"
          />
          <p href="tel:9841589007">+977-9841589007</p>
        </div>
        <div className="email-div">
          <img
            className="contact-icon wood-email-icon"
            src="/images/homeImg/email-icon.png"
            alt="mail-icon"
          />
          <p href="mailto:abhipok4@gmail.com">abhipok4@gmail.com</p>
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
