import React from 'react'
import PropTypes from 'prop-types'
import Banner from './Banner'
import image from '../../../assets/trophy.png'

const Win = (props) => {
  return (
    <Banner
      onNewGame={props.onNewGame}
      onCancel={props.onCancel}>
      <h1>YOU WON!</h1>
      <img src={image} alt="trophy" /> 
    </Banner>
  )
}

Win.propTypes = {
  onNewGame: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default Win
