import React from 'react'
import PropTypes from 'prop-types'
import Button, {BUTTON_TYPES, BUTTON_SIZES} from '../../UI/Button/Button'

import './style.css.scss'

const Banner = ({className, onNewGame, onCancel, children}) => {
  return (
    <div className={`banner ${className}`}>
      {children}
      <div className="buttons">
        <Button 
          buttonType={BUTTON_TYPES.secondary}
          buttonSize={BUTTON_SIZES.small}
          onClick={onCancel}>CANCEL</Button>
        <Button 
          buttonSize={BUTTON_SIZES.small} 
          onClick={onNewGame}>Play Again!</Button>
      </div>
    </div>
  )
}

Banner.propTypes = {
  className: PropTypes.string,
  onNewGame: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default Banner
