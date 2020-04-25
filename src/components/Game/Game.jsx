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

  const applySetup = ({width, height, mines}) => {
    setConfig({width, height, mines})
    setGameStatus(GAME_STATUS.started)
  }

  const handleWin = () => setGameStatus(GAME_STATUS.won)
  const handleLose = () => setGameStatus(GAME_STATUS.lost)

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
            onLose={handleLose} />
      )}
      { gameStatus === GAME_STATUS.won && <WinBanner /> }
      { gameStatus === GAME_STATUS.lost && <LoseBanner /> }
    </div>
  )
}

export default Game
