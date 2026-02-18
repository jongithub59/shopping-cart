import { useState, useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router";
import { Link } from "react-router";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart((prev) => [...prev, item]);
    console.log("Added item:", item);
  }

  function clearCart() {
    setCart([]);
  }

  function removeFromCart(index, item) {
    setCart((prev) => prev.filter((_, i) => i !== index));
    console.log(`Removed ${item.name} from cart.`);
  }

  // check cart for redundent item components since components become the upgrade
  // ex. extra spirit becomes improved spirit when bought, so it should not be in cart or count for total souls
  function cleanCart() {
    // get items that are components of items already in the cart ex. close quarters and point blanl
    const itemComponents = cart.flatMap((item) => item.components ?? []);

    // create new cart without redundant item upgrade components of items already in cart
    const cleanedCart = cart.filter(
      (item) =>
        // filter by items that are NOT components of existing cart items
        !itemComponents.includes(item.className),
    );

    // prevent infinite loops by only running setCart when cleanedCart length is different
    // from cart state, so only when component filtering is needed
    if (cleanedCart.length !== cart.length) {
      setCart(cleanedCart);
    }
  }

  useEffect(() => {
    cleanCart();
  }, [cart]); // run cart checking whenever cart changes

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
        <Outlet
          context={{ cart, addToCart, setCart, clearCart, removeFromCart }}
        />
      </div>
    </>
  );
}

export default App;
