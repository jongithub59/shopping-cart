import { useState, useEffect, useMemo } from "react";
import "./App.css";
import { Outlet } from "react-router";
import { Link } from "react-router";

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [ownedItems, setOwnedItems] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // cache a map of all items to make it easier to look up components by className
  const itemMap = useMemo(() => {
    const map = {};
    items.forEach((item) => {
      map[item.className] = item;
    });
    return map;
  }, [items]);

  // reworked app to fetch items once and organize them for the shop instead of fetching everytime we swap categories
  useEffect(() => {
    fetch(`https://assets.deadlock-api.com/v2/items`) // fetch all items
      .then((response) => response.json())
      .then((response) =>
        response
          .filter((item) => {
            // only items that can be purchased in-game will be added to the array and exclude legendaries that are not in the normal mode
            return item.shopable == true && item.cost !== 9999;
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
            activeDescription: item.description.active,
            passiveDescription: item.description.passive,
            image: item.shop_image,
            category: item.item_slot_type,
            components: item.component_items,
            isActive: item.is_active_item,
            isImbue: item.imbue,
            properties: item.properties,
            desc: item.description,
            stats: item.upgrades[0].property_upgrades,
          })),
      )
      .then((response) => {
        setItems(response);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  // get the components of an item and add them to a set,
  function grabComponents(item, grabbed = new Set()) {
    if (!item.components) return grabbed; // just return if item has no upgrade components

    for (const className of item.components) {
      // prevent infinite loops
      if (!grabbed.has(className)) {
        grabbed.add(className); // add the component's className to the set
      }

      // look up full item object of the component so we can also grab its components if they exist
      // ex. Juggernaut builds from Enduring Speed which builds from Sprint Boots
      const componentItem = itemMap[className];
      if (componentItem) {
        grabComponents(componentItem, grabbed); // recursive call to now grab the components of this component
      }
    }

    return grabbed;
  }

  // rework this to also update new state for owned items separate from cart
  function buyItem(item) {
    // add this item's components to a set if it has any
    const componentSet = grabComponents(item);

    // add the item and its components to owned items
    setOwnedItems((prev) => {
      // new updated set that will contain new item and its components will replace old owned set state
      const updatedOwnedSet = new Set(prev);

      // add new item first to the set
      updatedOwnedSet.add(item.className);

      // now add the item's component(s) to the updated set
      componentSet.forEach((component) => updatedOwnedSet.add(component));

      // return updated set for the owned items state setter
      return updatedOwnedSet;
    });

    setCart((prev) => [...prev, item]);

    console.log("Added item:", item);
  }

  function clearCart() {
    setCart([]);
  }

  // same logic as buyItem but instead we remove them to sell
  function removeFromCart(index, item) {
    const componentSet = grabComponents(item);

    setOwnedItems((prev) => {
      const updatedOwnedSet = new Set(prev);
      updatedOwnedSet.delete(item.className);
      componentSet.forEach((component) => updatedOwnedSet.delete(component));
      return updatedOwnedSet;
    });
    setCart((prev) => prev.filter((_, i) => i !== index));

    console.log(`Removed ${item.name} from cart.`);
  }

  // check cart for redundent item components since components become the upgrade
  // ex. extra spirit becomes improved spirit when bought, so it should not be in cart or count for total souls
  function cleanCart() {
    // get items that are components of items already in the cart ex. close quarters and point blanl
    const itemComponents = cart.flatMap((item) => item.components ?? []);

    // create new cart without redundant item upgrade components of items already in cart
    const cleanedCart = cart.filter(
      (item) =>
        // filter by items that are NOT components of existing cart items
        !itemComponents.includes(item.className),
    );

    // prevent infinite loops by only running setCart when cleanedCart length is different
    // from cart state, so only when component filtering is needed
    if (cleanedCart.length !== cart.length) {
      setCart(cleanedCart);
    }
  }

  useEffect(() => {
    cleanCart();
  }, [cart]); // run cart checking whenever cart changes

  if (error) return <p>A network error was encountered</p>;

  return (
    <>
      <div className="app">
        <div className="navbar">
          <div className="home-button">
            <Link to="/">
              <button>Home</button>
            </Link>
          </div>
          <div className="shop-button">
            <Link to="/Shop">
              <button>Shop</button>
            </Link>
          </div>
          <div className="cart-button">
            <Link to="Cart">
              <button>
                Cart{cart.length > 0 ? `: ${cart.length} item(s)` : ""}
              </button>
            </Link>
          </div>
        </div>
        {/* outlet context allows access to this state variable if it's in the route (which is everything in App) */}
        {isLoading ? (
          <div className="loading">
            <h1>Loading...</h1>
          </div>
        ) : (
          <Outlet
            context={{
              cart,
              items,
              ownedItems,
              buyItem,
              setCart,
              clearCart,
              removeFromCart,
            }}
          />
        )}
      </div>
    </>
  );
}

export default App;
