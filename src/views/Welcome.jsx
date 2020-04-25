import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div>
      <h1>Minesweeper</h1>
      <Link to="/setup">New Game</Link>
    </div>
  )
}

export default Welcome
