import { useState } from "react";

function Item(props) {
  const isOwned = props.ownedItems.has(props.item.className);
  return (
    <div
      // add the purchased style rule that disables mouse event for the element
      className={`item ${isOwned ? "purchased " : ""} ${
        props.noMouse ? "no-mouse no-hover" : ""
      }`}
      onClick={() => props.buyItem(props.item)}
      onMouseEnter={() => props.onHover(props.item)}
      onMouseLeave={props.onLeave}
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
