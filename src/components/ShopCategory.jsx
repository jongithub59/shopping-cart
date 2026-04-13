import Item from "./Item";
import soul from "../assets/price_currency.png";

function ShopCategory(props) {
  // make a copy of props then sort it in alphabetical order
  const sortedItems = [...props.shopItems].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  // take the sorted items array and turn it into an object with the items grouped by tier
  // this allows for easier rendering later with less duplicated code
  const itemsByTier = sortedItems.reduce((acc, item) => {
    if (!acc[item.tier]) acc[item.tier] = []; // if the accumulater has no property array for the tier, create it
    acc[item.tier].push(item); // push the item to the matching tier property array
    return acc; // return the accumulater, which the object containing the items grouped in arrays by tier
  }, {}); // inital value of acc will be an object

  // simple function to render items to avoid duplication
  function renderItems(tierItems = []) {
    return tierItems.map((item, index) => {
      return (
        <Item
          key={item.id}
          index={index}
          buyItem={props.buyItem}
          item={item}
          category={props.category}
          cart={props.cart}
          ownedItems={props.ownedItems}
          onHover={props.setHoveredItem}
          onLeave={() => props.setHoveredItem(null)}
        />
      );
    });
  }

  return (
    <>
      <section className="section tier-1">
        <div className="section-header tier-1-header">
          <img className="soul-symbol" src={soul} alt="Currency symbol" />
          <h3>800</h3>
        </div>
        <div className="items-grid ">{renderItems(itemsByTier[1])}</div>
      </section>

      <section className="section tier-2">
        <div className="section-header tier-2-header">
          <img className="soul-symbol" src={soul} alt="Currency symbol" />
          <h3>1600</h3>
        </div>
        <div className="items-grid ">{renderItems(itemsByTier[2])}</div>
      </section>

      <section className="section tier-3">
        <div className="section-header tier-3-header">
          <img className="soul-symbol" src={soul} alt="Currency symbol" />
          <h3>3200</h3>
        </div>
        <div className="items-grid ">{renderItems(itemsByTier[3])}</div>
      </section>

      <section className="section tier-4">
        <div className="section-header tier-4-header">
          <img className="soul-symbol" src={soul} alt="Currency symbol" />
          <h3>6400</h3>
        </div>
        <div className="items-grid ">{renderItems(itemsByTier[4])}</div>
      </section>

      {/* <section className="section tier-1">
        <div className="section-header tier-1-header">
          <img className="soul-symbol" src={soul} alt="Currency symbol" />
          <h3>800</h3>
        </div>
        <div className="items-grid ">
          {sortedItems
            // take only tier one items then render those Item components
            .filter((item) => {
              return item.tier == 1;
            })
            .map((item, index) => (
              <Item
                key={item.id}
                index={index}
                buyItem={props.buyItem}
                item={item}
                category={props.category}
                cart={props.cart}
                ownedItems={props.ownedItems}
                onHover={props.setHoveredItem}
                onLeave={() => props.setHoveredItem(null)}
              />
            ))}
        </div>
      </section>

      <section className="section tier-2">
        <div className="section-header tier-2-header">
          <img className="soul-symbol" src={soul} alt="Currency symbol" />
          <h3>1600</h3>
        </div>
        <div className="items-grid">
          {sortedItems
            .filter((item) => {
              return item.tier == 2;
            })

            .map((item, index) => (
              <Item
                key={item.id}
                index={index}
                buyItem={props.buyItem}
                item={item}
                category={props.category}
                cart={props.cart}
                ownedItems={props.ownedItems}
                onHover={props.setHoveredItem}
                onLeave={() => props.setHoveredItem(null)}
              />
            ))}
        </div>
      </section>

      <section className="section tier-3">
        <div className="section-header tier-3-header">
          <img className="soul-symbol" src={soul} alt="Currency symbol" />
          <h3>3200</h3>
        </div>
        <div className="items-grid ">
          {sortedItems
            .filter((item) => {
              return item.tier == 3;
            })

            .map((item, index) => (
              <Item
                key={item.id}
                index={index}
                buyItem={props.buyItem}
                item={item}
                category={props.category}
                cart={props.cart}
                ownedItems={props.ownedItems}
                onHover={props.setHoveredItem}
                onLeave={() => props.setHoveredItem(null)}
              />
            ))}
        </div>
      </section>

      <section className="section tier-4">
        <div className="section-header tier-4-header">
          <img className="soul-symbol" src={soul} alt="Currency symbol" />
          <h3>6400</h3>{" "}
        </div>
        <div className="items-grid ">
          {sortedItems
            .filter((item) => {
              return item.tier == 4;
            })
            .map((item, index) => (
              <Item
                key={item.id}
                index={index}
                buyItem={props.buyItem}
                item={item}
                category={props.category}
                cart={props.cart}
                ownedItems={props.ownedItems}
                onHover={props.setHoveredItem}
                onLeave={() => props.setHoveredItem(null)}
              />
            ))}
        </div>
      </section> */}
    </>
  );
}

export default ShopCategory;
