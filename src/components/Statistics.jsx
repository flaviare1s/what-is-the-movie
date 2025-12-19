/* eslint-disable react/prop-types */
import './Statistics.css'

export function Statistics({ currentScore, onBackToMenu, isVictory = false }) {
  const stats = JSON.parse(localStorage.getItem('movieGameStats') || '{}')
  const highScore = stats.highScore || 0
  const gamesPlayed = stats.gamesPlayed || 0
  const gamesWon = stats.gamesWon || 0
  const totalScore = stats.totalScore || 0

  const averageScore = gamesPlayed > 0 ? Math.round(totalScore / gamesPlayed) : 0
  const winRate = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0

  return (
    <div className='statistics'>
      <h1>{isVictory ? '🎉 Congratulations!' : 'Statistics'}</h1>
      {isVictory && <p className='victory-message'>Congratulations!</p>}

      <div className='stats-container'>
        <div className='stat-item current'>
          <span className='stat-label'>Current Score</span>
          <span className='stat-value'>{currentScore}</span>
        </div>

        <div className='stat-item highlight'>
          <span className='stat-label'>High Score</span>
          <span className='stat-value'>{highScore}</span>
        </div>

        <div className='stat-item'>
          <span className='stat-label'>Games Played</span>
          <span className='stat-value'>{gamesPlayed}</span>
        </div>

        <div className='stat-item'>
          <span className='stat-label'>Games Won</span>
          <span className='stat-value'>{gamesWon}</span>
        </div>

        <div className='stat-item'>
          <span className='stat-label'>Win Rate</span>
          <span className='stat-value'>{winRate}%</span>
        </div>

        <div className='stat-item'>
          <span className='stat-label'>Average Score</span>
          <span className='stat-value'>{averageScore}</span>
        </div>
      </div>

      <div className='stats-buttons'>
        <button onClick={onBackToMenu}>Restart</button>
      </div>
    </div>
  )
}
