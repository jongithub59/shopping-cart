import { Link, useOutletContext } from "react-router";
import ShopCategory from "./ShopCategory";
import shopLogo from "../assets/shop_logo_ui.png";
import { useState, useEffect } from "react";

function Shop() {
  const { cart, items, ownedItems, buyItem, setCart } = useOutletContext();
  const [category, setCategory] = useState("weapon");
  const [shopItems, setShopItems] = useState([]);

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

  return (
    <>
      <div className="shop-logo">
        <img src={shopLogo} alt="Shop Logo" />
      </div>
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
          <div className="exit-button">
            <Link to="/">
              <button>X</button>
            </Link>
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
          ></ShopCategory>
        </div>
      </div>
    </>
  );
}

export default Shop;
