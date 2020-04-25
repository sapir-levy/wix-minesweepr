import React from 'react'
import PropTypes from 'prop-types'
import BoardCells from './Cells/Cells'
import FlagsIndicator from './FlagsIndicator/FlagsIndicator'

import './style.css.scss'

const Board = (props) => {
  return (
    <div className="board">
      <BoardCells 
        cells={props.mineField}
        onFlag={props.onFlag}
        onReveal={props.onReveal} />
    </div>
  )
}

Board.propTypes = {
  mineField: PropTypes.arrayOf(
    PropTypes.arrayOf( 
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        status: PropTypes.string
      })
    )
  ),
  flagsLeft: PropTypes.number.isRequired,
  onFlag: PropTypes.func.isRequired,
  onReveal: PropTypes.func.isRequired
}

export default Board
