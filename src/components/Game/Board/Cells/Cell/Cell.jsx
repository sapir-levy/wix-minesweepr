import React from 'react'
import PropTypes from 'prop-types'

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
    <div className={`cell ${cell.status}`} 
      onClick={handleClick}
      onContextMenu={handleRightClick}>
        <span className="cell-value">{cell.value}</span>
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
