import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <div className="app">
        {/* outlet context allows access to this state variable if it's in the route (which is everything in App) */}
        <Outlet context={{ cart, setCart }} />
      </div>
    </>
  );
}

export default App;
