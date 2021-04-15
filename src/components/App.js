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
      showInbox: true,
    };

    this.handleInboxFilter = this.handleInboxFilter.bind(this);
    this.handleDeleteFilter = this.handleDeleteFilter.bind(this);
    this.handleTextFilter = this.handleTextFilter.bind(this);
  }
  //Eventos
  handleInboxFilter = (ev) => {
    this.setState({ showInbox: true });
  };
  handleDeleteFilter = (ev) => {
    this.setState({
      showInbox: false,
    });
  };
  handleTextFilter = (data) => {
    this.setState({
      inboxFilter: data.value,
    });
  };

  //Funcion pintar en un parrafo lo que hace la usuaria

  renderFilter() {
    const emailType = this.state.showInbox ? "recibidos" : "borrados";
    const filterText =
      this.state.inboxFilter === "" ? (
        "y sin filtrar"
      ) : (
        <span>
          y filtrando por{" "}
          <span className="text--bold">{this.state.inboxFilter}</span>
        </span>
      );
    return (
      <p className="mb-1">
        La usuaria está visualizando los emails{" "}
        <span className="text--bold">{emailType}</span> {filterText}
      </p>
    );
  }

  //Funcion de renderizado y filtrado

  renderEmails = () => {
    const inboxFilter = this.state.inboxFilter.toLocaleLowerCase();
    return (
      this.state.emails
        //Filtro por inbox vs deleted
        .filter((email) => {
          return this.state.showInbox === true ? !email.deleted : email.deleted;
        })

        //filtro por busqueda
        .filter((email) => {
          // console.log(email, this.state.inboxFilter);
          return (
            email.fromEmail.toLowerCase().includes(inboxFilter) ||
            email.fromName.toLowerCase().includes(inboxFilter) ||
            email.body.toLowerCase().includes(inboxFilter)
          );
        })
        .map((email) => {
          return (
            <EmailItem
              key={email.id}
              from={email.fromName}
              subject={email.fromEmail}
              time={email.date}
              deleted={email.deleted}
              read={email.read}
            />
          );
        })
    );
  };
  render() {
    console.log(this.state, this.props);
    return (
      <>
        <Header
          handleInboxFilter={this.handleInboxFilter}
          handleDeleteFilter={this.handleDeleteFilter}
          handleTextFilter={this.handleTextFilter}
        />
        {this.renderFilter()}
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
