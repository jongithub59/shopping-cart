import Item from "./Item";

function ShopCategory(props) {
  props.items.sort((a, b) => a.name.localeCompare(b.name)); // sort items in alphabetical order
  return (
    <>
      {/* Section 1 */}
      <section className="section tier-1">
        <div className="section-header tier-1">
          <h2>800 Souls | Tier 1</h2>
        </div>
        <div className="items-grid ">
          {props.items
            // take only tier one items then render those Item components
            .filter((item) => {
              return item.tier == 1;
            })
            .map((item) => (
              <Item
                key={item.id}
                addToCart={props.addToCart}
                item={item}
                category={props.category}
              />
            ))}
        </div>
      </section>
      {/* Section 2*/}
      <section className="section tier-2">
        <div className="section-header tier-2">
          <h2>1600 Souls | Tier 2</h2>
        </div>
        <div className="items-grid">
          {props.items
            .filter((item) => {
              return item.tier == 2;
            })

            .map((item) => (
              <Item
                key={item.id}
                addToCart={props.addToCart}
                item={item}
                category={props.category}
              />
            ))}
        </div>
      </section>
      {/* Section 3 */}
      <section className="section tier-3">
        <div className="section-header tier-3">
          <h2>3200 Souls | Tier 3</h2>
        </div>
        <div className="items-grid ">
          {props.items
            .filter((item) => {
              return item.tier == 3;
            })

            .map((item) => (
              <Item
                key={item.id}
                addToCart={props.addToCart}
                item={item}
                category={props.category}
              />
            ))}
        </div>
      </section>
      {/* Section 4 */}
      <section className="section tier-4">
        <div className="section-header tier-4">
          <h2>6400 Souls | Tier 4 | Experts Only!</h2>
        </div>
        <div className="items-grid ">
          {props.items
            .filter((item) => {
              return item.tier == 4;
            })
            .map((item) => (
              <Item
                key={item.id}
                addToCart={props.addToCart}
                item={item}
                category={props.category}
              />
            ))}
        </div>
      </section>
    </>
  );
}

export default ShopCategory;
