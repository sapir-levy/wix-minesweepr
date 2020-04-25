import React from 'react'
import PropTypes from 'prop-types'

import './style.css.scss'

const Button = ({className, onClick, children}) => {
  const handleClick = (e) => {
    e.stopPropagation()

    onClick()
  }

  return (
    <button className={`button ${className}`} onClick={handleClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
  className: ''
}

export default Button
