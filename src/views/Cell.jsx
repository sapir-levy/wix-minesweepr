import React, {useEffect} from 'react'
import PropTypes from 'prop-types'

import './style.css.scss'

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
  
}


export default Cell
