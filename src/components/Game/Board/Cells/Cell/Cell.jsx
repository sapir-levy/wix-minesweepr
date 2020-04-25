import React from 'react'
import PropTypes from 'prop-types'

const VALUE_COLORS = {
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

const Cell = ({cell, onFlag, onReveal}) => {
  const handleRightClick = (e) => {
    if(e.shiftKey) { 
      e.preventDefault() 
      onFlag()
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    onReveal()
  }

  return (
    <div className={`cell ${cell.status} ${cell.value}`} 
      onClick={handleClick}
      onContextMenu={handleRightClick}>
        <span 
          className={`cell-value ${cell.value === EMPTY_CELL ? 'empty' : ''}`}
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
