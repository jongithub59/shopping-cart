import { Link } from "react-router";
import Item from "./Item";

function Shop() {
  return (
    <div className="shop">
      <div className="exit-button">
        <Link to="/">
          <button>X</button>
        </Link>
      </div>
      <div className="shop-main">
        {/* Section 1 */}
        <section className="section tier-1">
          <div className="section-header tier-1">
            <h2>800 Souls | Tier 1</h2>
          </div>
          <div className="items-grid ">
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
          </div>
        </section>

        {/* Section 2*/}
        <section className="section tier-2">
          <div className="section-header tier-2">
            <h2>1600 Souls | Tier 2</h2>
          </div>
          <div className="items-grid">
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item> </Item>
            <Item> </Item>
          </div>
        </section>

        {/* Section 3 */}
        <section className="section tier-3">
          <div className="section-header tier-3">
            <h2>3200 Souls | Tier 3</h2>
          </div>
          <div className="items-grid ">
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
          </div>
        </section>

        {/* Section 4 */}
        <section className="section tier-4">
          <div className="section-header tier-4">
            <h2>6400 Souls | Tier 4 | Experts Only!</h2>
          </div>
          <div className="items-grid ">
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
            <Item> </Item>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Shop;
