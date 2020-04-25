import React, { useState } from 'react'
import List from '../../UI/List/List'
import SkillButton from './SkillButton/SkillButton'
import CustomSetup from './CustomSetup/CustomSetup'

const SETUP_TYPES = {
  skill: "skill",
  custom: "custom"
}

const SETUP_CONFIG = [
  {
    label: "Easy",
    className: 'easy-skill-btn',
    params: {
      width: 10,
      height: 10,
      mines: 10
    },
    type: SETUP_TYPES.skill
  },
  {
    label: "Normal",
    className: 'normal-skill-btn',
     params: {
      width: 30,
      height: 30,
      mines: 30
    },
    type: SETUP_TYPES.skill
  },
  {
    label: "Hard",
    className: 'hard-skill-btn',
     params: {
      width: 50,
      height: 50,
      mines: 50
    },
    type: SETUP_TYPES.skill
  },
  {
    label: "Custom",
    className: 'custom-skill-btn',
    type: SETUP_TYPES.custom
  }
]

const Setup = (props) => {
  const [showCustomSetupDialog, setShowCustomSetupDialog] = useState(false)
  
  const handleCustomSetup = () => setShowCustomSetupDialog(true)

  const handleClick = (type) => {
    return type == SETUP_TYPES.skill ? props.onApplySetup : handleCustomSetup
  }

  return (
    <div>
      <List 
        listItems={SETUP_CONFIG}
        renderItem={(skill) => (
          <SkillButton 
            skill={skill}
            onClick={handleClick(skill.type)} />
        )} />
      { true && (
          <CustomSetup onApply={props.onApplySetup} />
      )}
    </div>
  )
}

export default Setup
