import { Link } from "react-router";
import titleCard from "../assets/deadlock_titlecard.png";
import video from "../assets/menu_streets_loop2-vmake.mp4";

function Home() {
  return (
    <>
      <div className="home-page">
        <div className="title-card">
          <img src={titleCard} alt="Deadlock" />
        </div>
        <div className="home-page-content">
          <Link to="/Shop">
            <button>Enter The Curiousity Shop</button>
          </Link>
        </div>
      </div>
      <video autoPlay muted loop id="video-background">
        <source src={video} type="video/mp4" />
      </video>
    </>
  );
}

export default Home;
