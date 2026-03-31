import Item from "./Item";
import shopLogo from "../assets/shop_logo_ui.png";
import soul from "../assets/price_currency.png";
import { Link, useOutlet, useOutletContext } from "react-router";

function Cart() {
  const { cart, setCart, removeFromCart } = useOutletContext();

  const totalCost = cart.reduce((total, item) => total + item.cost, 0); // calculate sum of total cart price
  const formattedCost = totalCost.toLocaleString(); // format cast to add comma

  console.log(`Current cart: ${cart.map((item) => item.name)}`);
  return (
    <div className="app">
      <div className="shop-logo">
        <img src={shopLogo} alt="Shop Logo" />
      </div>
      <div className="cart-page">
        <div className="cart-header">
          <h1>Cart</h1>
          {/* conditional elements if cart is empty or not */}
          {cart.length == 0 && <h2>Cart is empty</h2>}
          {cart.length > 0 && (
            <h2>
              Total Cost:{" "}
              <img className="soul-symbol" src={soul} alt="Currency symbol" />
              {formattedCost}
            </h2>
          )}
          <div className="cart-exit-button">
            <Link to="/Shop">
              <button>Keep Shopping</button>
            </Link>
          </div>
        </div>
        <hr />
        <div className="cart-items">
          {[...cart] // take current cart
            .map((item, index) => ({ item, index })) // attach index of original order
            .sort((a, b) => {
              // now sort by tiers, 1 being first, 4 being last
              if (a.item.tier !== b.item.tier) {
                return a.item.tier - b.item.tier;
              }
              return a.index - b.index; // then sort by original buy order within tiers
            })
            .map(({ item, index }) => (
              <div
                className="cart-item"
                key={index}
                style={{ backgroundColor: `var(--${item.category}-accent)` }}
              >
                <div
                  className="cart-item-graphic"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(index, item)}
                  >
                    X
                  </button>
                </div>
                <div className="cart-item-content">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="remove-from-cart"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
