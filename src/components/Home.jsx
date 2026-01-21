import { Link } from "react-router";

function Home() {
  return (
    <>
      <div className="cart-button">
        <button>Cart</button>
      </div>
      <div className="home-page">
        <div className="header">
          <h1>Deadlock</h1>
        </div>
        <div className="home-page-content">
          <button>
            <Link to="shop">Enter Shop</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
