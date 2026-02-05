import Item from "./Item";
import { Link, useOutlet, useOutletContext } from "react-router";

function Cart() {
  const { cart, setCart, removeFromCart } = useOutletContext();

  console.log(`Current cart: ${cart}`);
  return (
    <div className="app">
      <div className="cart-page">
        <h2>Cart</h2>
        <div className="exit-button">
          <Link to="/">
            <button>X</button>
          </Link>
        </div>
        <div className="cart-items">
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <div className="cart-item-name">{item.name}</div>
              <div className="remove-from-cart">
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(index, item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
