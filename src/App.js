import React from "react";

import { Papers, Footer, Header, Lab, Testimonial, Alumni } from "./container";
import { Navbar } from "./components";
import "./App.scss";

// App
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <Papers />
      <Alumni />
      <Lab />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default App;
