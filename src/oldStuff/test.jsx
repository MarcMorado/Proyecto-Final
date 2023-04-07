import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('update', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('update');
      socket.off('disconnect');
    };
  }, []);

  const handleJoin = (name) => {
    socket.emit('join', name);
  };

  const handleAttack = (playerId) => {
    socket.emit('attack', playerId);
  };

  return (
    <div>
      <h1>Simple Game</h1>
      <PlayerForm onJoin={handleJoin} />
      {players.map((player) => (
        <Player key={player.id} player={player} onAttack={handleAttack} />
      ))}
    </div>
  );
}

function PlayerForm({ onJoin }) {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onJoin(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <button type="submit">Join</button>
    </form>
  );
}

function Player({ player, onAttack }) {
  return (
    <div>
      <h2>{player.name}</h2>
      <div>Health: {player.health}</div>
      <button onClick={() => onAttack(player.id)}>Attack</button>
    </div>
  );
}

export default App;
