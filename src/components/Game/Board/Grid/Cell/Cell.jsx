import React from 'react'
import PropTypes from 'prop-types'

import './style.css.scss'

const VALUE_COLORS = {
  0: "#00c6c8",
  1: "#2a7ce6",
  2: "#fc4b28",
  3: "#fc4b28",
  4: "#ee6bca",
  5: "#737175",
  6: "#5b12a5",
  7: "#5a4244",
  8: "#000000"
}

const EMPTY_CELL = 0
const MINE = '*'

const Cell = ({cell, onFlag, onReveal, supermanMode}) => {
  const handleRightClick = (e) => {
    if(e.shiftKey) { 
      if(supermanMode) { return }
      e.preventDefault() 
      onFlag()
    }
  }

  const handleClick = (e) => {
    if(supermanMode) { return }
    e.preventDefault()
    onReveal()
  }

  const classNames = {
    default: "cell",
    mine: cell.value === MINE ? 'mine' : '',
    empty: cell.value === EMPTY_CELL ? 'empty' : '',
    superman: supermanMode ? 'superman-enabled' : 'superman-disabled',
    status: cell.status
  }

  return (
    <div className={Object.values(classNames).join(' ')}
      onClick={handleClick}
      onContextMenu={handleRightClick}>
        <span 
          className="cell-value"
          style={{color: VALUE_COLORS[cell.value]}}>{cell.value}</span>
      
    </div>
  )
}

Cell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string
  }),
  onFlag: PropTypes.func.isRequired,
  onReveal: PropTypes.func.isRequired
}


export default Cell
