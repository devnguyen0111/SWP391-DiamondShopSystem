// emailChat.jsx
import React, { useState } from "react";
import { List, Avatar, Badge, Layout, Typography } from "antd";
import "./emailListDashboard.css";

const { Header, Content } = Layout;

const initialEmailData = [
  {
    id: 1,
    sender: "Matt from Nas Acade.",
    subject: "Can you do this in one night?",
    details: "AI + your ideas → 🎉 [Join the Challenge?]",
    time: "20:04",
    unread: true,
  },
  {
    id: 2,
    sender: "LinkedIn",
    subject: "Sahil Gaba recently posted",
    details:
      "Trending on LinkedIn: Google offers 100+ free courses for programming. Here are my ...",
    time: "19:24",
    unread: true,
  },
  // Thêm các email khác ở đây
];

const EmailChat = () => {
  const [emailData, setEmailData] = useState(initialEmailData);

  const handleEmailClick = (id) => {
    setEmailData(
      emailData.map((email) =>
        email.id === id ? { ...email, unread: false } : email
      )
    );
  };

  return (
    <Layout className="email-layout">
      <Header className="email-header">
        <Typography.Title level={3} className="email-title special-header-lol">
          Inbox
        </Typography.Title>
      </Header>
      <Content className="email-content">
        <List
          itemLayout="horizontal"
          dataSource={emailData}
          renderItem={(item) => (
            <List.Item
              className={item.unread ? "email-item email-unread" : "email-item"}
              onClick={() => handleEmailClick(item.id)}
            >
              <List.Item.Meta
                avatar={
                  <Badge dot={item.unread}>
                    <Avatar className="avatar-margin-top-special">
                      {item.sender.charAt(0)}
                    </Avatar>
                  </Badge>
                }
                title={<span className="email-sender">{item.sender}</span>}
                description={
                  <span className="email-subject">{item.subject}</span>
                }
              />
              <div className="email-details">
                <span className="email-text">{item.details}</span>
                <span className="email-time">{item.time}</span>
              </div>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default EmailChat;

// /src/components/EmailList.jsx
// import React from "react";
// import PropTypes from "prop-types";
// import EmailItem from "../dashboard-emailIem/emailItemDashboard";

// const EmailList = ({ emails, onEmailClick }) => {
//   return (
//     <div className="email-list">
//       {emails.map((email) => (
//         <EmailItem
//           key={email.id}
//           email={email}
//           onClick={() => onEmailClick(email.id)}
//         />
//       ))}
//     </div>
//   );
// };

// EmailList.propTypes = {
//   emails: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       sender: PropTypes.string.isRequired,
//       subject: PropTypes.string.isRequired,
//       time: PropTypes.string.isRequired,
//       read: PropTypes.bool.isRequired,
//     })
//   ).isRequired,
//   onEmailClick: PropTypes.func.isRequired,
// };

// export default EmailList;
