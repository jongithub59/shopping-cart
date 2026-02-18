import { Link, useOutletContext } from "react-router";
import ShopCategory from "./ShopCategory";
import Item from "./Item";
import { useState, useEffect } from "react";

function Shop() {
  const { cart, addToCart, setCart } = useOutletContext();
  const [category, setCategory] = useState("weapon");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://assets.deadlock-api.com/v2/items/by-slot-type/${category}`) // fetch request will fetch items of certain category based on category state
      .then((response) => response.json())
      .then((response) =>
        response
          .filter((item) => {
            return item.shopable == true; // only items that can be purchased in-game will be added to the array
          })
          .map((item) => ({
            // creates and array of objects containing relevant info as props
            id: item.id,
            name: item.name,
            className: item.class_name,
            itemType: item.type,
            tier: item.item_tier,
            cost: item.cost,
            description: item.description.desc,
            image: item.shop_image,
            type: item.item_slot_type,
            components: item.component_items,
            isActive: item.is_active_item,
            isImbue: item.imbue,
            properties: item.properties,
            desc: item.description,
            stats: item.upgrades[0].property_upgrades,
          })),
      )
      .then((response) => setItems(response)) // update state to contain
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [category]); // re-fetch items when category state changes

  function changeCategory(category) {
    setCategory(category);
    console.log();
  }

  if (error) return <p>A network error was encountered</p>;

  return (
    <div className="shop">
      <div className="shop-header">
        <div className="shop-header-left"></div>
        <div className="shop-categories">
          {/* Buttons to change what category of items are displayed */}
          <div className="weapon-category">
            <button onClick={() => changeCategory("weapon")}>Weapon</button>
          </div>
          <div className="vitality-category">
            <button onClick={() => changeCategory("vitality")}>Vitality</button>
          </div>
          <div className="spirit-category">
            <button onClick={() => changeCategory("spirit")}>Spirit</button>
          </div>
        </div>
        <div className="exit-button">
          <Link to="/">
            <button>X</button>
          </Link>
        </div>
      </div>
      <div className="shop-main">
        {isLoading ? (
          <div className="loading">
            <h1>Loading...</h1>
          </div>
        ) : (
          <ShopCategory
            category={category}
            items={items}
            cart={cart}
            addToCart={addToCart}
          ></ShopCategory>
        )}
      </div>
    </div>
  );
}

export default Shop;
