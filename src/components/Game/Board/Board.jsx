import React from 'react'
import PropTypes from 'prop-types'
import BoardGrid from './Grid/Grid'
import FlagsIndicator from './FlagsIndicator/FlagsIndicator'
import SupermanButton from './SupermanButton/SupermanButton'

import './style.css.scss'

const Board = (props) => {
  return (
    <div className="board">
      <div className="board-header">
        <FlagsIndicator 
          flagsLeft={props.flagsLeft} 
          showFlagsWarning={props.showFlagsWarning} />
        <SupermanButton onSupermanClick={props.onSupermanClick} />
      </div>
      <BoardGrid 
        cells={props.mineField}
        onFlag={props.onFlag}
        onReveal={props.onReveal}
        supermanMode={props.supermanMode} />
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
  showFlagsWarning: PropTypes.bool,
  onFlag: PropTypes.func.isRequired,
  onReveal: PropTypes.func.isRequired,
  onSupermanClick: PropTypes.func.isRequired,
  supermanMode: PropTypes.bool.isRequired
}

export default Board
