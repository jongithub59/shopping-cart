import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  const [cart, setCart] = useState(["cart"]);

  return (
    <>
      <div className="app">
        <Outlet />
      </div>
    </>
  );
}

export default App;
