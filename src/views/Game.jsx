import React from 'react'
import Board from './Board'

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 10,
      height: 10,
      mines: 10
    }
  }


  render() {
    return (
      <div>
        <Board 
          width={this.state.width}
          height={this.state.height}
          minesCount={this.state.mines} />
      </div>
    )
  }
}

export default Game
