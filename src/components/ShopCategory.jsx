import Item from "./Item";
import soul from "../assets/price_currency.png";

function ShopCategory(props) {
  props.shopItems.sort((a, b) => a.name.localeCompare(b.name)); // sort items in alphabetical order
  return (
    <>
      {/* Section 1 */}
      <section className="section tier-1">
        <div className="section-header tier-1-header">
          <img className="soul-symbol" src={soul} alt="Currency symbol" />
          <h3>800</h3>
        </div>
        <div className="items-grid ">
          {props.shopItems
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
                onLeave={() => props.setHoveredItem}
              />
            ))}
        </div>
      </section>
      {/* Section 2*/}
      <section className="section tier-2">
        <div className="section-header tier-2-header">
          <img className="soul-symbol" src={soul} alt="Currency symbol" />
          <h3>1600</h3>
        </div>
        <div className="items-grid">
          {props.shopItems
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
                onLeave={() => props.setHoveredItem}
              />
            ))}
        </div>
      </section>
      {/* Section 3 */}
      <section className="section tier-3">
        <div className="section-header tier-3-header">
          <img className="soul-symbol" src={soul} alt="Currency symbol" />
          <h3>3200</h3>
        </div>
        <div className="items-grid ">
          {props.shopItems
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
                onLeave={() => props.setHoveredItem}
              />
            ))}
        </div>
      </section>
      {/* Section 4 */}
      <section className="section tier-4">
        <div className="section-header tier-4-header">
          <img className="soul-symbol" src={soul} alt="Currency symbol" />
          <h3>6400</h3>{" "}
        </div>
        <div className="items-grid ">
          {props.shopItems
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
                onLeave={() => props.setHoveredItem}
              />
            ))}
        </div>
      </section>
    </>
  );
}

export default ShopCategory;
