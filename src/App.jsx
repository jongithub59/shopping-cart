import { useState } from "react";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Item from "./components/Item";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <Shop></Shop>
      </div>
    </>
  );
}

export default App;
