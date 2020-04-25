import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../UI/Button/Button'

import './style.css.scss'

const SkillButton = ({skill, onClick}) => {
  return (
    <Button className={skill.className} onClick={onClick}>
      {skill.label}
    </Button>
  )
}

SkillButton.propTypes = {
  skill: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SkillButton