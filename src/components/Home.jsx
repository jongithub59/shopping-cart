import { Link } from "react-router";

function Home() {
  return (
    <>
      <div className="cart-button">
        <Link to="Cart">
          <button>Cart</button>
        </Link>
      </div>
      <div className="home-page">
        <div className="header">
          <h1>Deadlock</h1>
        </div>
        <div className="home-page-content">
          <Link to="/Shop">
            <button>Enter Shop</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
