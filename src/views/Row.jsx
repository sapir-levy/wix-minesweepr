import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'

const Row = ({cells, onFlag, onReveal}) => {
  return (
    <div className="row">
      {
        cells.map((cell, ci) => (
          <Cell 
            key={ci} 
            cell={cell} 
            onFlag={() => onFlag(ci)}
            onReveal={() => onReveal(ci)} />
        ))
      }
    </div>
  )
}

Row.propTypes = {
  
}

export default Row
