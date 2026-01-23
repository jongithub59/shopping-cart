import Item from "./Item";
import { Link } from "react-router";

function Cart() {
  return (
    <div className="app">
      <div className="cart-page">
        <div className="exit-button">
          <Link to="/">
            <button>X</button>
          </Link>
        </div>
        <div className="cart-items">
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
        </div>
      </div>
    </div>
  );
}

export default Cart;
