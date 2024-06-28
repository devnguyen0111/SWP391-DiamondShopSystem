// /src/components/Sidebar.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Sidebar = ({ onComposeClick }) => {
  return (
    <div className="sidebar">
      <button onClick={onComposeClick}>Compose</button>
      <ul>
        <li>
          <Link to="/inbox">Inbox</Link>
        </li>
        <li>
          <Link to="/starred">Starred</Link>
        </li>
        <li>
          <Link to="/sent">Sent</Link>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  onComposeClick: PropTypes.func.isRequired,
};

export default Sidebar;
