import React from 'react'
import PropTypes from 'prop-types'
import ReactSlider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './style.css.scss'

const railStyle = {
  backgroundColor: '#dfd7ad',
  height: '8px'
}

const trackStyle = {
  backgroundColor: '#a27beb',
  height: '8px'
}

const handleStyle = {
  borderColor: '#a27beb',
  backgroundColor: '#a27beb',
  height: '25px',
  width: '25px',
  boxShadow: 'none',
  marginTop: '-8px'
}

const Slider = ({
  name,
  minValue,
  maxValue,
  onChange,
  value
}) => {
  return (
    <div className="silder-container">
      {name && (
        <div className="slider-title">
          <label>{name}</label>
          <span className="value">{value}</span>
        </div>
      )}
      <div className="silder-wrapper">
        <label>{minValue}</label>
        <ReactSlider
          className="minesweeper-slider"
          min={minValue}
          max={maxValue}
          value={value}
          onChange={onChange}
          railStyle={railStyle}
          trackStyle={trackStyle}
          handleStyle={handleStyle} />
        <label>{maxValue}</label>
      </div>
    </div>
  )
}

Slider.propTypes = {
  name: PropTypes.string,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
}

export default Slider
