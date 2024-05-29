import React from "react";
import "../../pages/CSS/footer.css";
import footerLogo from "../../Images/png/Snowbizz_full.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="footer-distributed" id="contact">
        <div className="footer-left">
          <img src={footerLogo} className="footer-img" alt />
          <p className="footer-links">
            <Link to="/" className="link-1">
              Home
            </Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/policy">Privacy</Link>
          </p>
          <p className="footer-company-name"> &copy; SnowBizz Clothing </p>
        </div>
        <div className="footer-center">
          <div className="infor">
            <div>
              <i className="fa fa-phone" />
              +91-9726786899
            </div>
            <div>
              <i className="fa fa-envelope" />
              darshan25503@gmail.com
            </div>
          </div>
        </div>
        <div className="footer-right">
          <p className="footer-company-about">
            Exclusivity: We handpick designer pieces that you won't find just
            anywhere. Each item in our store is carefully selected for its
            uniqueness and style. Quality: We are committed to offering you the
            best in terms of materials, craftsmanship, and durability. Our
            selection ensures you're not only fashionable but comfortable too.
            Customer-Centric Approach: Our team is dedicated to providing you
            with exceptional customer service. We're here to answer your
            questions and help you make the perfect fashion choices.
          </p>
          <div className="footer-icons">
            <Link to="https://www.instagram.com/darshan25503/">
              <i className="fa fa-instagram" />
            </Link>
            <Link to="#">
              <i className="fa fa-linkedin" />
            </Link>
          </div>
        </div>
        <center>
          <span>All Rights Reserved &copy; SnowBizz Clothing</span>
        </center>
      </footer>
    </>
  );
};

export default Footer;
