import React from 'react'
import PropTypes from 'prop-types'

import './style.css.scss'

const WARNING = "NO MORE FLAGS LEFT"

const FlagsIndicator = ({flagsLeft, showFlagsWarning}) => (
  <div className="flags-indicator">
    <h2 className="flags-left">Flags Left: {flagsLeft}</h2>
    { showFlagsWarning && (
        <span className="warning">{WARNING}</span>
    )}
  </div>
)

FlagsIndicator.propTypes = {
  flagsLeft: PropTypes.number.isRequired,
  showFlagsWarning: PropTypes.bool.isRequired
}

export default FlagsIndicator
