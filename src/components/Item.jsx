function Item(props) {
  return (
    <div className="item" onClick={() => props.addToCart(props.item)}>
      <div
        className="item-graphic"
        style={{ backgroundImage: `url(${props.item.image})` }}
      ></div>
      <div className="item-name">{props.item.name}</div>
    </div>
  );
}

export default Item;
