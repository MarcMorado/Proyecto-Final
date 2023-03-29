import { useContext } from "react";
import { CreateGameContext } from "../context/CreateGameContext";

export default function CreateGame() {
  const { generatedCode } = useContext(CreateGameContext);
  const { roomCreated } = useContext(CreateGameContext);
  const { playerJoin } = useContext(CreateGameContext);
  const { roomCode } = useContext(CreateGameContext);
  const { handleCreateGame } = useContext(CreateGameContext);
  const { handleJoinGame } = useContext(CreateGameContext);
  const { handlePlayerJoinGame } = useContext(CreateGameContext);
  const { handleMasterJoinGame } = useContext(CreateGameContext);
  const { roomCodeInput } = useContext(CreateGameContext);

  return (
    <div>
      <button className="btn btn-ghost btn-outline" onClick={handleJoinGame}>
        Join Game as Player
      </button>
      {playerJoin && (
        <div>
          <input
            type="text"
            name="code"
            value={roomCode}
            required
            onChange={roomCodeInput}
            placeholder="code"
          ></input>
          <button onClick={handlePlayerJoinGame}>Join game</button>
        </div>
      )}
      <button className="btn btn-ghost btn-outline" onClick={handleCreateGame}>
        Create Game as Master
      </button>
      {roomCreated && (
        <div>
          <p>{generatedCode}</p>
          <button onClick={handleMasterJoinGame}>Join Game</button>
        </div>
      )}
    </div>
  );
}
