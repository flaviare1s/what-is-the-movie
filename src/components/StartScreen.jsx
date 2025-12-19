/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import './StartScreen.css'
import { GameRules } from './GameRules'

export const StartScreen = ({ startGame }) => {
  return (
    <div className='start'>
      <h1>WHAT'S THE MOVIE?</h1>
      <p>Click the button below to start playing!</p>
      <button onClick={startGame}>Start</button>
      < GameRules />
    </div>
  )
}
