import React from "react";

import { Papers, Footer, Header, Lab, Testimonial, Alumni, Members } from "./container";
import { Navbar } from "./components";
import "./App.scss";
import Students from "./container/Students/Students";

// App
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <Members/>
      <Papers />
      <Students/>
      <Alumni />
      <Lab />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default App;
