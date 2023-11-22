import './Game.css'
import React from 'react';
import { useState , useEffect} from 'react'

import { GameOver } from './GameOver'

export function Game({ moviesData }) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(10)
  const [guess, setGuess] = useState('')
  const [congratulationsMessage, setCongratulationsMessage] = useState('')
  const [lossMessage, setLossMessage] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [hasGuessed, setHasGuessed] = useState(false)
  const [showGuessBox, setShowGuessBox] = useState(true)

  const currentMovie = moviesData[currentMovieIndex]
  const totalHints = currentMovie.hints.length;
  const remainingHints = totalHints - currentHintIndex - 1

  const handleGuess = (userGuess) => {
    console.log('Handling guess:', userGuess)
    if (!hasGuessed) {
      if (!userGuess.trim()) {
        alert('Please make a guess!')
        return
      }

      if (userGuess.toLowerCase() === currentMovie.title.toLowerCase()) {
        const pointsEarned = 500 - currentHintIndex * 100
        setScore(score + pointsEarned)

        if (currentMovieIndex < moviesData.length - 1) {
          setCongratulationsMessage('Congratulations! You got the movie right!')
          setTimeout(() => {
            setCurrentMovieIndex(currentMovieIndex + 1)
            setCurrentHintIndex(0)
            setHasGuessed(false)
            setShowGuessBox(true)
            setGuess('')
          }, 500)
        } else {
          setCongratulationsMessage('You have completed the game!')
          setShowOptions(true)
        }
      } else {
        setLives(lives - 1)

        if (lives === 1) {
          alert('You lost all your lives!')
          setShowOptions(true)
        } else {
          alert('You lost a life!')
          setShowOptions(true)
        }

        setGuess('');
        setHasGuessed(true)
        setShowGuessBox(false)
      }
    }
  };

  const handleOptionClick = (option) => {
    console.log('Option clicked:', option)

    setShowOptions(false)

    if (option === 'retry') {
      setShowGuessBox(true)
      setCurrentHintIndex(currentHintIndex + 1)
      setHasGuessed(false)
    } else if (option === 'changeMovie') {
      setCurrentMovieIndex(currentMovieIndex + 1)

      if (currentMovieIndex + 1 < moviesData.length) {
        setShowGuessBox(true)
        setCurrentHintIndex(0)
        setHasGuessed(false)
      } else {
        setCongratulationsMessage('Congratulations! You finished the game!')
        setShowOptions(true)
      }
    }
  };

  const handleRestart = () => {
    setCurrentMovieIndex(0)
    setCurrentHintIndex(0)
    setScore(0)
    setLives(10)
    setGuess('')
    setCongratulationsMessage('')
    setLossMessage('')
    setShowOptions(false)
    setHasGuessed(false)
    setShowGuessBox(true)
  };

  const handleGuessChange = (event) => {
    setGuess(event.target.value)
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault()
    handleGuess(guess)
  };

  useEffect(() => {
    console.log('Effect triggered. Lives:', lives)

    if (lives === 0 && !congratulationsMessage) {
      setLossMessage('Game Over!')
      setShowOptions(true)
    }
  }, [lives, congratulationsMessage])

  return (
    <div>
      {lives > 0 ? (
        <>
          <h1>Score: {score}</h1>
          <h2>Lives: {lives}</h2>
          <p>Hint: {currentMovie.hints[currentHintIndex]}</p>
          <p>Remaining Hints: {remainingHints}</p>

          {congratulationsMessage && <p>{congratulationsMessage}</p>}
          {lossMessage && <p>{lossMessage}</p>}

          {showGuessBox && !showOptions && (
            <form onSubmit={handleGuessSubmit}>
              <label>
                Guess the Movie:
                <input type="text" value={guess} onChange={handleGuessChange} />
              </label>
              <button type="submit">
                Take a guess
              </button>
            </form>
          )}

          {showOptions && (
            <div>
              <p>Do you want another tip or do you want to change movie?</p>
              <button onClick={() => handleOptionClick('retry')}>Keep trying</button>
              <button onClick={() => handleOptionClick('changeMovie')}>Change movie</button>
            </div>
          )}

          <div>
            <h3>Hints:</h3>
            <ul>
              {currentMovie.hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <GameOver onRestart={handleRestart} />
      )}
    </div>
  );
}