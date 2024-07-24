// /src/components/ComposePopup.jsx
import React from "react";
import PropTypes from "prop-types";

const ComposePopup = ({ onClose }) => {
  return (
    <div className="compose-popup">
      <div className="compose-header">
        <h2>New Message</h2>
        <button onClick={onClose}>X</button>
      </div>
      <form>
        <input type="text" placeholder="Recipients" />
        <input type="text" placeholder="Subject" />
        <textarea placeholder="Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

ComposePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ComposePopup;
