import React, { useState } from 'react';
import '../css/temp.css'

interface PiecePosition {
  x: number;
  y: number;
}

interface Player {
  color: string;
  pieces: PiecePosition[];
}

const LudoBoard: React.FC = () => {
  const initialPlayers: Player[] = [
    { color: 'red', pieces: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }] },
    { color: 'blue', pieces: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }] },
    { color: 'green', pieces: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }] },
    { color: 'yellow', pieces: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }] },
  ];

  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  const movePiece = (playerIndex: number, pieceIndex: number, newPosition: PiecePosition) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers[playerIndex].pieces[pieceIndex] = newPosition;
      return updatedPlayers;
    });
  };

  return (
    <div className="ludo-board">
      {players.map((player, playerIndex) => (
        <div key={player.color} className={`player-${player.color}`}>
          {player.pieces.map((piece, pieceIndex) => (
            <div
              key={pieceIndex}
              className="piece"
              style={{ backgroundColor: player.color, top: `${piece.y}px`, left: `${piece.x}px` }}
              onClick={() => movePiece(playerIndex, pieceIndex, { x: 100, y: 100 })} // Sample move, replace with your logic
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LudoBoard;
