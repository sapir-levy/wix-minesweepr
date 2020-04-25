import React from 'react'
import PropTypes from 'prop-types'
import Banner from './Banner'
import image from '../../../assets/bomb.png'

const Lose = (props) => {
  return (
    <Banner
      onNewGame={props.onNewGame}
      onCancel={props.onCancel}>
      <h1>YOU LOST!</h1>
      <img src={image} alt="bomb" /> 
    </Banner>
  )
}

Lose.propTypes = {
  onNewGame: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default Lose
