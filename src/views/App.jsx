import React from 'react'
import logo from '../assets/logo.png'
import Game from '../components/Game/Game'

import './style.css.scss'

const App = (props) => {
  return (
    <div className="app-wrapper">
      <img className="app-logo" src={logo} alt="logo"/>
      <h1>MINESWEEPER</h1>
      <Game />
    </div>
  )
}

export default App
