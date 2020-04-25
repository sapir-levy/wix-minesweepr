import React from 'react'
import PropTypes from 'prop-types'

import './style.css.scss'

export const BUTTON_TYPES = {
  primary: "primary",
  secondary: "secondary",
}

export const BUTTON_SIZES = {
  small: "small",
  medium: "medium",
  large: "large",
}

const Button = ({className, onClick, buttonType, buttonSize, children}) => {
  const handleClick = (e) => {
    e.stopPropagation()

    onClick()
  }

  return (
    <button 
      className={`button ${className} ${buttonType} ${buttonSize}`} 
      onClick={handleClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  buttonType: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
  buttonSize: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
  className: '',
  buttonType: BUTTON_TYPES.primary,
  buttonSize: BUTTON_SIZES.medium
}

export default Button
