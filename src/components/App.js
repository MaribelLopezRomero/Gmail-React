import React from "react";
import "../stylesheets/App.css";
import Header from "./Header";
import EmailItem from "./EmailItem";
import EmailReader from "./EmailReader";
import emails from "../data/emails.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inboxFilter: "",
    };

    this.handleInboxFilter = this.handleInboxFilter.bind(this);
    this.handleDeleteFilter = this.handleDeleteFilter.bind(this);
    this.handleTextFilter = this.handleTextFilter.bind(this);
  }
  handleInboxFilter = (ev) => {
    console.log(`Mensajes recibidos`);
  };
  handleDeleteFilter = (ev) => {
    console.log(`Mensajes borrados`);
  };
  handleTextFilter = (data) => {
    console.log(`Mensaje filtrado: `, data.value);
    this.setState({
      inboxFilter: data.value,
    });
  };
  render() {
    console.log(this.state, this.props);

    const filterEmails = () => {
      return emails
        .filter((email) => {
          console.log(email, this.state.inboxFilter);
          return email.fromEmail.includes(this.state.inboxFilter);
        })
        .map((email) => {
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

    // const filterEmails = emails
    //   .filter((email) => {
    //     return email.fromEmail.includes(this.state.inboxFilter);
    //   })
    //   .map((email) => {
    //     console.log(email);
    //     return (
    //       <EmailItem
    //         key={email.id}
    //         from={email.fromName}
    //         subject={email.fromEmail}
    //         time={email.date}
    //       />
    //     );
    //   });

    return (
      <>
        <Header
          handleInboxFilter={this.handleInboxFilter}
          handleDeleteFilter={this.handleDeleteFilter}
          handleTextFilter={this.handleTextFilter}
        />
        <table className="table">
          <tbody>{filterEmails()}</tbody>
        </table>

        <EmailReader />
      </>
    );
  }
}

export default App;
