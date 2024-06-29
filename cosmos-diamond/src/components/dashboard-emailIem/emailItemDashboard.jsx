// /src/components/EmailItem.jsx
import React from "react";
import PropTypes from "prop-types";

const EmailItem = ({ email, onClick }) => {
  return (
    <div
      className={`email-item ${email.read ? "" : "unread"}`}
      onClick={onClick}
    >
      <span>{email.sender}</span>
      <span>{email.subject}</span>
      <span>{email.time}</span>
    </div>
  );
};

EmailItem.propTypes = {
  email: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sender: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    read: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EmailItem;
