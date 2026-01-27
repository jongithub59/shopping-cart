import Item from "./Item";
import { Link, useOutlet, useOutletContext } from "react-router";

function Cart() {
  const { cart } = useOutletContext();

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
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
