function Item(props) {
  return (
    <div className="item" onClick={() => props.addToCart(props.name)}>
      <div className="item-graphic">
        <img src="bleh" alt="item graphic" />
      </div>
      <div className="item-name">{props.name}</div>
    </div>
  );
}

export default Item;
