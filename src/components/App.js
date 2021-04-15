import React from "react";
import "../stylesheets/App.css";
import Header from "./Header";
import EmailItem from "./EmailItem";
import EmailReader from "./EmailReader";
import apiEmails from "../data/emails.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inboxFilter: "",
      emails: apiEmails,
    };

    this.handleInboxFilter = this.handleInboxFilter.bind(this);
    this.handleDeleteFilter = this.handleDeleteFilter.bind(this);
    this.handleTextFilter = this.handleTextFilter.bind(this);
  }
  //Eventos
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

  //Funcion de renderizado y filtrado

  renderEmails = () => {
    const inboxFilter = this.state.inboxFilter.toLocaleLowerCase();
    return this.state.emails
      .filter((email) => {
        // console.log(email, this.state.inboxFilter);
        return (
          email.fromEmail.toLowerCase().includes(inboxFilter) ||
          email.fromName.toLowerCase().includes(inboxFilter) ||
          email.body.toLowerCase().includes(inboxFilter)
        );
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
  render() {
    console.log(this.state, this.props);

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
          <tbody>{this.renderEmails()}</tbody>
        </table>

        <EmailReader
          fromName={this.state.emails[0].fromName}
          fromEmail={this.state.emails[0].fromEmail}
          subject={this.state.emails[0].subject}
          body={this.state.emails[0].body}
        />
      </>
    );
  }
}

export default App;
