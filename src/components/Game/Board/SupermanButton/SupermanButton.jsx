import React from 'react'
import PropTypes from 'prop-types'
import Button, { BUTTON_SIZES, BUTTON_TYPES } from '../../../UI/Button/Button'
import superman from '../../../../assets/superman.png'

import './style.css.scss'

const SupermanButton = ({onSupermanClick}) => {
  return (
    <Button 
      className="superman-button" 
      onClick={onSupermanClick}
      buttonType={BUTTON_TYPES.transparent}
      buttonSize={BUTTON_SIZES.unset}>
      <img src={superman} alt="superman"/>
    </Button>
  )
}

SupermanButton.propTypes = {
  onSupermanClick: PropTypes.func.isRequired
}

export default SupermanButton
