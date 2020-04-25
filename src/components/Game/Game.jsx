import React, { useState } from 'react'
import GameBoard from './Board/BoardContainer'
import GameSetup from './Setup/Setup'
import WinBanner from './Banners/Win'
import LoseBanner from './Banners/Lose'

import './style.css.scss'

const GAME_STATUS = {
  setup: "setup",
  started: "started",
  lost: "lost",
  won: "won"
}


const Game = (props) => {
  const [config, setConfig] = useState({})
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.setup)
  const [supermanMode, setSupermanMode] = useState(false)

  const applySetup = ({width, height, mines}) => {
    setConfig({width, height, mines})
    setGameStatus(GAME_STATUS.started)
  }

  const handleWin = () => setGameStatus(GAME_STATUS.won)
  const handleLose = () => setGameStatus(GAME_STATUS.lost)
  const handleStartNewGame = () => setGameStatus(GAME_STATUS.started)
  const handleCloseBanner = () => setGameStatus(GAME_STATUS.setup)
  const handleSupermanClick = () => setSupermanMode(!supermanMode)

  return (
    <div className="minesweeper-game">
      { gameStatus === GAME_STATUS.setup && (
          <GameSetup onApplySetup={applySetup} />
      )}
      { gameStatus === GAME_STATUS.started && (
          <GameBoard 
            width={config.width}
            height={config.height}
            minesCount={config.mines}
            onWin={handleWin}
            onLose={handleLose}
            supermanMode={supermanMode}
            onSupermanClick={handleSupermanClick} />
      )}
      { gameStatus === GAME_STATUS.won && (
          <WinBanner onNewGame={handleStartNewGame} onCancel={handleCloseBanner} /> 
      )}
      { gameStatus === GAME_STATUS.lost && (
          <LoseBanner onNewGame={handleStartNewGame} onCancel={handleCloseBanner}/> 
      )}
    </div>
  )
}

export default Game
