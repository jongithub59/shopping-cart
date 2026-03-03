import Item from "./Item";

function ShopCategory(props) {
  props.shopItems.sort((a, b) => a.name.localeCompare(b.name)); // sort items in alphabetical order
  return (
    <>
      {/* Section 1 */}
      <section className="section tier-1">
        <div className="section-header tier-1">
          <h4>800</h4>
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
              />
            ))}
        </div>
      </section>
      {/* Section 2*/}
      <section className="section tier-2">
        <div className="section-header tier-2">
          <h4>1600</h4>
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
              />
            ))}
        </div>
      </section>
      {/* Section 3 */}
      <section className="section tier-3">
        <div className="section-header tier-3">
          <h4>3200</h4>
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
              />
            ))}
        </div>
      </section>
      {/* Section 4 */}
      <section className="section tier-4">
        <div className="section-header tier-4">
          <h4>6400</h4>
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
              />
            ))}
        </div>
      </section>
    </>
  );
}

export default ShopCategory;
