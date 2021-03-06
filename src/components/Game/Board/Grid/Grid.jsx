import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell/Cell'

const Grid = ({cells, onFlag, onReveal, supermanMode}) => {
  return (
    <div className="grid">
      {
        cells.map((cellsRow, ri) => (
          <div className="row" key={ri}>
            {
              cellsRow.map((cell, ci) => (
                <Cell 
                  key={[ri,ci]} 
                  cell={cell} 
                  onFlag={() => onFlag(ri, ci)}
                  onReveal={() => onReveal(ri, ci)}
                  supermanMode={supermanMode} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

Grid.propTypes = {
  cells: PropTypes.arrayOf(
    PropTypes.arrayOf( 
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        status: PropTypes.string
      })
    )
  ),
  onFlag: PropTypes.func.isRequired,
  onReveal: PropTypes.func.isRequired,
  supermanMode: PropTypes.bool.isRequired
}

export default Grid
