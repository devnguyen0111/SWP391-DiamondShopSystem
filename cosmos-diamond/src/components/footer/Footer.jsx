// src/components/Footer.jsx
// import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h3>Customer Care</h3>
          <a href="#">Live Chat</a>
          <a href="#">1-800-242-2728</a>
          <a href="#">Email Us</a>
          <a href="#">Contact Us</a>
          <a href="#">FAQ</a>
          <a href="#">Returns</a>
        </div>
        <div className="footer-column">
          <h3>Why Cosmos Diamonds?</h3>
          <a href="#">Conflict Free Diamonds</a>
          <a href="#">Diamond Price Matching</a>
          <a href="#">Diamond Upgrade Program</a>
          <a href="#">Free Lifetime Warranty</a>
          <a href="#">Free Secure Shipping</a>
          <a href="#">Free Boxes & Gift Cards</a>
          <a href="#">Cosmos Diamonds Credit Card</a>
          <a href="#">Jewelry Insurance</a>
        </div>
        <div className="footer-column">
          <h3>About Cosmos Diamonds</h3>
          <a href="#">Quality & Value</a>
          <a href="#">Diamond Sustainability</a>
          <a href="#">Cosmos Diamonds Blog</a>
          <a href="#">Locations</a>
          <a href="#">Careers</a>
        </div>
        <div className="footer-column">
          <h3>Diamond Shapes</h3>
          <a href="#">Round</a>
          <a href="#">Princess</a>
          <a href="#">Cushion</a>
          <a href="#">Oval</a>
          <a href="#">Emerald</a>
          <a href="#">Pear</a>
          <a href="#">Asscher</a>
          <a href="#">Heart</a>
          <a href="#">Radiant</a>
          <a href="#">Marquise</a>
        </div>
        <div className="footer-column">
          <h3>Join the Cosmos Diamonds</h3>
          <input
            type="email"
            placeholder="Email Address"
            className=" outline-none border-b-2 border-neutral-300 pb-1"
          />
          <button>Sign Up</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Cosmos Diamonds Inc.</p>
        {/* <div className="social-icons">
          <a href="#" className="social-icon">Facebook</a>
          <a href="#" className="social-icon">Instagram</a>
          <a href="#" className="social-icon">Twitter</a>
          <a href="#" className="social-icon">Pinterest</a>
        </div> */}
        <div className="footer-links">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Site Map</a>
          <a href="#">Accessibility</a>
          {/* <a href="#">Do Not Sell My Personal Information</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
