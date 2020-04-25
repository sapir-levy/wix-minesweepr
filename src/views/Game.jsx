import React from 'react'
import Board from './Board'
import GameSetup from './Setup'

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
        <Board 
          width={this.state.width}
          height={this.state.height}
          minesCount={this.state.mines} />
      </div>
    )
  }
}

export default Game
