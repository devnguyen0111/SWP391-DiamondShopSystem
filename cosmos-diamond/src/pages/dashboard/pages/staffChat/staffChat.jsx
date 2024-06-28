// /src/App.jsx
import React, { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import EmailList from "./components/EmailList";
// import ComposePopup from "./components/ComposePopup";

// import EmailItem from "../../../../components/dashboard-emailIem/emailItemDashboard";
import EmailList from "../../../../components/dashboard-emailList/emailListDashboard";
import ComposePopup from "../../../../components/dashboard-popupMail/popupMailDashboard";
import Sidebar from "../../../../components/dashboard-sidebar/sidebarDashboard";

const StaffChat = () => {
  //   const [emails, setEmails] = useState([
  //     {
  //       id: 1,
  //       sender: "LinkedIn",
  //       subject: "Sahil Gaba recently posted",
  //       time: "19:24",
  //       read: false,
  //     },
  //     {
  //       id: 2,
  //       sender: "ResearchGate",
  //       subject: "Thanh Nguyen Phuoc recommended this preprint",
  //       time: "14:04",
  //       read: true,
  //     },
  //     // Add more emails here
  //   ]);
  //   const [selectedEmail, setSelectedEmail] = useState(null);
  //   const [isComposePopupOpen, setIsComposePopupOpen] = useState(false);

  //   const handleEmailClick = (id) => {
  //     setEmails(
  //       emails.map((email) =>
  //         email.id === id ? { ...email, read: true } : email
  //       )
  //     );
  //     setSelectedEmail(emails.find((email) => email.id === id));
  //   };

  //   const handleComposeClick = () => {
  //     setIsComposePopupOpen(true);
  //   };

  //   const handleCloseComposePopup = () => {
  //     setIsComposePopupOpen(false);
  //   };

  return <EmailList />;
};

export default StaffChat;
