import React from 'react'
import PropTypes from 'prop-types'

const FlagsIndicator = ({flagsLeft}) => {
  return (
    <h2 className="flags-indicator">Flags Left: {flagsLeft}</h2>
  )
}

FlagsIndicator.propTypes = {
  flagsLeft: PropTypes.number.isRequired
}

export default FlagsIndicator
