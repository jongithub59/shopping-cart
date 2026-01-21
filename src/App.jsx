import { useState } from "react";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Item from "./components/Item";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <Home></Home>
      </div>
    </>
  );
}

export default App;
