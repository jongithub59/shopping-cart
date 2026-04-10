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
  const [hoveredItemStats, setHoveredItemStats] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // state variable to track mouse position to render toolip at mouse position

  // get the hovered item's properties and update state to display item stats in the tooltip
  useEffect(() => {
    if (hoveredItem == null) return; // check to avoid errors
    setHoveredItemStats(getInnateStats(hoveredItem.properties));
  }, [hoveredItem]);

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

  // go through the items properties array and filter for the stats we want to display
  function getInnateStats(properties) {
    const filteredProperties = Object.values(properties).filter(
      (prop) =>
        prop.tooltip_section == "innate" &&
        prop.value !== "" &&
        prop.value != 0 &&
        prop.value != null,
    );

    return filteredProperties;
  }

  // some prefixes are weird so this makes sure to display a plus or minus for stats
  function formatValue(value, prefix) {
    if (prefix === "{s:sign}") {
      // if prefix is this instead of + or -
      return value.includes("-") ? value : `+${value}`; // if the value contains a minus, then just return that, otherwise a put a plus with the value
    }

    if (prefix === undefined) prefix = "";

    value = `${prefix}${value}`;

    return value;
  }

  // now just return the data like so: prefix, value, postfix, then label (ex: +40% Weapon Damge)
  function formatStat(prop) {
    const value = formatValue(prop.value, prop.prefix);
    const postfix =
      prop.postfix == "m" || prop.postfix == " m" ? "" : prop.postfix || ""; // for some reason m is on the postfix and value, so just remove one
    const label = prop.label || "";

    return `${value}${postfix} ${label}`;
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
          <div
            className="shop-main"
            // when mouse moves within the shop, update state with current mouse x and y position in an object literal
            onMouseMove={(e) =>
              setMousePosition({ x: e.clientX, y: e.clientY })
            }
          >
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
        {/* show tooltip when an item is hovered, and show all formmatted data that has values in their props */}
        {hoveredItem && (
          <div
            className="item-tooltip"
            style={{
              backgroundColor: `var(--${category}-accent)`,
              // position toolip slightly to the left of where the mouse is
              left: mousePosition.x + 15,
              top: mousePosition.y,
            }}
          >
            <h3>{hoveredItem.name}</h3>
            {hoveredItemStats?.length > 0 && (
              <ul>
                {hoveredItemStats.map((prop, index) => (
                  <li key={index}>{formatStat(prop)}</li>
                ))}
              </ul>
            )}

            {hoveredItem.description && hoveredItem.isActive ? (
              <p>
                {/* for some reason some active descriptions aren't in the activeDescription prop, 
                this makes sure you know it's an active effect rather than a passive effect */}
                <strong>Active: </strong>
                {stripHTML(hoveredItem.description)}
              </p>
            ) : (
              <p>{stripHTML(hoveredItem.description)}</p>
            )}

            {hoveredItem.passiveDescription && (
              <>
                <p>{stripHTML(hoveredItem.passiveDescription)}</p>
              </>
            )}

            {hoveredItem.activeDescription && (
              <p>
                <strong>Active: </strong>
                {stripHTML(hoveredItem.activeDescription)}
              </p>
            )}
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
