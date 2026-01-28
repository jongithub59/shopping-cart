import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  const [cart, setCart] = useState([]);

  function clearCart() {
    setCart([]);
  }

  function removeFromCart(index, item) {
    setCart((prev) => prev.filter((_, i) => i !== index));
    console.log(`Removed ${item} from cart.`);
  }

  return (
    <>
      <div className="app">
        {/* outlet context allows access to this state variable if it's in the route (which is everything in App) */}
        <Outlet context={{ cart, setCart, clearCart, removeFromCart }} />
      </div>
    </>
  );
}

export default App;
