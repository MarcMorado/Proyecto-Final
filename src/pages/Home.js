import "../styles/Styles.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Home() {
  const navigate = useNavigate();
  const toFindGame = () => navigate("/find-game");
  const homeBodyRef = useRef(null);

  useEffect(() => {
    homeBodyRef.current.classList.add('alt');
  }, []);
  
  return (
    <div className="home-body" ref={homeBodyRef}>
      <div className="info-home">
        <button onClick={toFindGame}>START Playing</button>
      </div>
    </div>
  );
}
