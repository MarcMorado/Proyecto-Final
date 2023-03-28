import imgDragon from "../assets/dragon.png";
import imgCrow from "../assets/crow.png";
import bgTop from "../assets/bgTop.png";
import "../styles/Styles.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const toFindGame = () => navigate('/find-game');
  return (
    <div className="home-body">
      <img src={bgTop} alt="dragon" className="img-blue" />
      <img src={imgCrow} alt="dragon" className="img-crow" />
      <div className="info-home">
        <p>Your adventure starts here!</p>
        <button onClick={toFindGame}>Join or Create a Game</button>
      </div>
      <img src={imgDragon} alt="dragon" className="img-dragon" />
    </div>
  );
}
