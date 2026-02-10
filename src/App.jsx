import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import { Link } from "react-router";

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
        <div className="navbar">
          <div className="home-button">
            <Link to="/">
              <button>Home</button>
            </Link>
          </div>
          <div className="shop-button">
            <Link to="/Shop">
              <button>Shop</button>
            </Link>
          </div>
          <div className="cart-button">
            <Link to="Cart">
              <button>
                Cart{cart.length > 0 ? `: ${cart.length} item(s)` : ""}
              </button>
            </Link>
          </div>
        </div>
        {/* outlet context allows access to this state variable if it's in the route (which is everything in App) */}
        <Outlet context={{ cart, setCart, clearCart, removeFromCart }} />
      </div>
    </>
  );
}

export default App;
