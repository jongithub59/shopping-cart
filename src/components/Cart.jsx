import Item from "./Item";
import { Link, useOutlet, useOutletContext } from "react-router";

function Cart() {
  const { cart, setCart, removeFromCart } = useOutletContext();

  const totalCost = cart.reduce((total, item) => total + item.cost, 0); // calculate sum of total cart price
  const formattedCost = totalCost.toLocaleString(); // format cast to add comma

  console.log(`Current cart: ${cart.map((item) => item.name)}`);
  return (
    <div className="app">
      <div className="cart-page">
        <div className="cart-header">
          <h2>Cart</h2>
          {/* conditional elements if cart is empty or not */}
          {cart.length == 0 && <h3> Cart is empty</h3>}
          {cart.length > 0 && <h3>Total Cost: {formattedCost} Souls</h3>}
          <div className="exit-button">
            <Link to="/">
              <button>Go Back</button>
            </Link>
          </div>
        </div>
        <div className="cart-items">
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
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
