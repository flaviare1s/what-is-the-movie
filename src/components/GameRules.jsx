/* eslint-disable react/no-unescaped-entities */
import './GameRules.css'

export const GameRules = () => {
  return (
    <div className='rules-wrapper'>
        <div className='rules'>
          <h2>Game Rules</h2>
              <ul>
                <li>Try to guess the name of the movie.</li>
                <li>I'll give you five tips.</li>
                <li>With every wrong guess you lose a life.</li>
                <li>Be careful, you only have ten lives.</li>
                <li>You earn a higher score when you use fewer hints.</li>
                <li>Good luck and let's get started!</li>
              </ul>
        </div>
    </div>
  )
}
