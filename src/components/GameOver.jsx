/* eslint-disable react/prop-types */
import './GameOver.css'

export function GameOver({ onRestart }) {
  return (
    <div className="game-over">
      <h1>Game Over!</h1>
      <p>You lost all your lives!</p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}
