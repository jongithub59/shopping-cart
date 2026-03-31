import { Link, useOutletContext } from "react-router";
import ShopCategory from "./ShopCategory";
import shopLogo from "../assets/shop_logo_ui.png";
import shopBackground from "../assets/background_nyc_cityscape_bw.webp";
import { useState, useEffect } from "react";

function Shop() {
  const { cart, items, ownedItems, buyItem, setCart } = useOutletContext();
  const [category, setCategory] = useState("weapon");
  const [shopItems, setShopItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    setShopItems(
      items.filter((item) => {
        return item.category == category;
      }),
    );
  }, [category]);

  function changeCategory(category) {
    setCategory(category);
    console.log();
  }

  // item descriptions from the api have inline html so this function removes them with a regular expression
  function stripHTML(text) {
    let strippedText;
    if (!text == "") {
      strippedText = text.replace(/<[^>]*>/g, ""); // find "<", then match everything until ">", and replace with "", empty string
      strippedText = strippedText.replace(/{[^}]*}/g, "R"); // // this is meant to show the reload keybind of the player, so I just use R
    }
    return strippedText;
  }

  return (
    <>
      <div className="shop-logo">
        <img src={shopLogo} alt="Shop Logo" />
      </div>
      <div className="shop-container">
        <div className={`shop ${category}`}>
          <div className="shop-header">
            <div className="shop-header-left"></div>
            <div className="shop-categories">
              {/* Buttons to change what category of items are displayed */}
              <div className="weapon-category">
                <button onClick={() => changeCategory("weapon")}>Weapon</button>
              </div>
              <div className="vitality-category">
                <button onClick={() => changeCategory("vitality")}>
                  Vitality
                </button>
              </div>
              <div className="spirit-category">
                <button onClick={() => changeCategory("spirit")}>Spirit</button>
              </div>
            </div>
          </div>
          <div className="shop-main">
            <ShopCategory
              category={category}
              shopItems={shopItems}
              items={items}
              cart={cart}
              ownedItems={ownedItems}
              buyItem={buyItem}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
            ></ShopCategory>
          </div>
        </div>
        {/* show tooltip when an item is hovered */}
        {hoveredItem && (
          <div className="item-tooltip">
            <h3>{hoveredItem.name}</h3>
            <p>{stripHTML(hoveredItem.description)}</p>
          </div>
        )}
      </div>
      <div className="shop-background">
        <img src={shopBackground} alt="" />
      </div>
    </>
  );
}

export default Shop;
