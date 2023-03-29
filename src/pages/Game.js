import { useLocation, useParams } from "react-router-dom";

export default function Game() {
  const { id } = useParams();
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const gameCode = pathArray[2];
  return (
    <div>
      <h1>Game {gameCode} and id {id}</h1>
      {/* Resto del código */}
    </div>
  );
}
