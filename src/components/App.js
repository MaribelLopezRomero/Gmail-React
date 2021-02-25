import React from 'react';
import '../stylesheets/App.css';
import Header from './Header';
import EmailItem from './EmailItem';
import EmailReader from './EmailReader';

function App() {
  return (
    <>
   <Header/>

    <table className="table">
      <tbody>
        <EmailItem from= "Front Fest" subject= "Entradas ya a la venta" time= "15:27" />
        <EmailItem from= "GitHub" subject= "Adalab/project-promo-i Local store #23" time= "15:27" />
        <EmailItem from= "Node Weekly" subject= "Node news" time= "20:41" />
      </tbody>
    </table>

    <EmailReader/>
  </>
  );
}

export default App;
