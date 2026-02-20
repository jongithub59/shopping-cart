import { useState, useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router";
import { Link } from "react-router";

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [ownedItems, setOwnedItems] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // rework this to also update new state for owned items separate from cart
  function buyItem(item) {
    setCart((prev) => [...prev, item]);
    setOwnedItems((prev) => new Set(prev).add(item.className));

    console.log("Added item:", item);
  }

  function clearCart() {
    setCart([]);
  }

  function removeFromCart(index, item) {
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
