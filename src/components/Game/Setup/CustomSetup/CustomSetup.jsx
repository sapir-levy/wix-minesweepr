import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slider from '../../../UI/Slider/Slider'
import Button from '../../../UI/Button/Button'

const CustomSetup = ({onApply}) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [mines, setMines] = useState(0)

  const handleChange = (handler) => (v) => handler(v)
  const handleApply = () => onApply({width, height, mines})

  return (
    <div>
      <Slider 
        name="WIDTH" 
        onChange={handleChange(setWidth)}
        value={width} />
      <Slider 
        name="HEIGHT" 
        onChange={handleChange(setHeight)}
        value={height} />
      <Slider 
        name="MINES" 
        onChange={handleChange(setMines)}
        value={mines} />
      <Button onClick={handleApply}>GO!</Button>
    </div>
  )
}

CustomSetup.propTypes = {
  
}

export default CustomSetup