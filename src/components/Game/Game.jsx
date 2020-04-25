import React from 'react'
import GameBoard from './Board/BoardContainer'
import GameSetup from './Setup/Setup'

import './style.css.scss'

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 10,
      height: 10,
      mines: 10
    }
  }

  handleWidthChange = (value) => this.setState({width: value})
  handleHeightChange = (value) => this.setState({height: value})
  handleMinesChange = (value) => this.setState({mines: value})

  applySetup = ({width, height, mines}) => {
    this.setState({width, height, mines})
  }

  render() {
    return (
      <div>
        <GameSetup onApplySetup={this.applySetup} />
        <GameBoard 
          width={this.state.width}
          height={this.state.height}
          minesCount={this.state.mines} />
      </div>
    )
  }
}

export default Game
