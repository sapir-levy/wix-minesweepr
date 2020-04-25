import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slider from '../../../UI/Slider/Slider'
import 
  Button, {BUTTON_TYPES, BUTTON_SIZES} 
from '../../../UI/Button/Button'

const DEFAULT_MIN_VALUE = 3
const DEFAULT_MAX_VALUE = 300
const DIMENSIONS_DEFAULT_VALUE = 150
const MINES_DEFAULT_VALUE = Math.pow(DIMENSIONS_DEFAULT_VALUE, 2) / 2

const CustomSetup = ({onApply, onClose}) => {
  const [width, setWidth] = useState(DIMENSIONS_DEFAULT_VALUE)
  const [height, setHeight] = useState(DIMENSIONS_DEFAULT_VALUE)
  const [mines, setMines] = useState(MINES_DEFAULT_VALUE)

  const handleChange = (handler) => (v) => handler(v)
  const handleApply = () => onApply({width, height, mines})

  return (
    <div className="custom-setup">
      <Slider 
        name="WIDTH" 
        onChange={handleChange(setWidth)}
        value={width}
        minValue={DEFAULT_MIN_VALUE}
        maxValue={DEFAULT_MAX_VALUE} />
      <Slider 
        name="HEIGHT" 
        onChange={handleChange(setHeight)}
        value={height}
        minValue={DEFAULT_MIN_VALUE}
        maxValue={DEFAULT_MAX_VALUE} />
      <Slider 
        name="MINES" 
        onChange={handleChange(setMines)}
        value={mines}
        minValue={DEFAULT_MIN_VALUE}
        maxValue={(width * height) || DEFAULT_MAX_VALUE} />
      <div className="buttons">
        <Button 
          onClick={onClose} 
          buttonType={BUTTON_TYPES.secondary}
          buttonSize={BUTTON_SIZES.small}>
          CANCEL
        </Button>
        <Button 
          onClick={handleApply}
          buttonSize={BUTTON_SIZES.small}>
          GO!
        </Button>
      </div>
    </div>
  )
}

CustomSetup.propTypes = {
  onApply: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default CustomSetup