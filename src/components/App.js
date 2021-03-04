import React from "react";
import "../stylesheets/App.css";
import Header from "./Header";
import EmailItem from "./EmailItem";
import EmailReader from "./EmailReader";
import emails from "../data/emails.json";

const renderEmails = () => {
  return emails.map((email) => {
    console.log(email);
    return (
      <EmailItem
        key={email.id}
        from={email.fromName}
        subject={email.fromEmail}
        time={email.date}
      />
    );
  });
};

function App() {
  const handleInboxFilter = (ev) => {
    console.log(`Mensajes recibidos`);
  };
  const handleDeleteFilter = (ev) => {
    console.log(`Mensajes borrados`);
  };
  const handleTextFilter = (data) => {
    console.log(`Mensaje filtrado: `, data);
  };
  return (
    <>
      <Header
        handleInboxFilter={handleInboxFilter}
        handleDeleteFilter={handleDeleteFilter}
        handleTextFilter={handleTextFilter}
      />
      <table className="table">
        <tbody>{renderEmails()}</tbody>
      </table>

      <EmailReader />
    </>
  );
}

export default App;
