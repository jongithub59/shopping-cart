import { useState } from "react";

function Item(props) {
  // check if the item has already in cart so we can prevent a second buy since you can't buy the same item twice in deadlock
  const inCart = props.cart.some(
    (cartItem) =>
      cartItem.id == props.item.id ||
      (cartItem.components && // check if the item has this item's className as a component
        cartItem.components.includes(props.item.className)),
  );
  return (
    <div
      // add the purchased style rule that disables mouse event for the element
      className={`item ${inCart ? "purchased " : ""} ${
        props.noMouse ? "no-mouse no-hover" : ""
      }`}
      onClick={() => props.addToCart(props.item)}
    >
      <div
        className="item-graphic"
        style={{ backgroundImage: `url(${props.item.image})` }}
      ></div>
      <div
        className="item-name"
        style={{ backgroundColor: `var(--${props.category}-accent)` }}
      >
        {props.item.name}
      </div>
    </div>
  );
}

export default Item;
