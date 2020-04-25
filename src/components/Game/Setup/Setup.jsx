import React, { useState } from 'react'
import List from '../../UI/List/List'
import SkillButton from './SkillButton/SkillButton'
import CustomSetup from './CustomSetup/CustomSetup'

import './style.css.scss'

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
  const handleCloseCustomSetup = () => setShowCustomSetupDialog(false)

  const handleApplySetup = (params) => props.onApplySetup(params)

  return (
    <div className="setup-wrapper">
      { !showCustomSetupDialog && (
          <List 
            listItems={SETUP_CONFIG}
            renderItem={(skill) => {
              const handleClick = skill.type == SETUP_TYPES.skill ? handleApplySetup : handleCustomSetup
              
              return (
                <SkillButton 
                  skill={skill}
                  onClick={() => handleClick(skill.params)} />
              )
            }} />
      )}
      { showCustomSetupDialog && (
          <CustomSetup 
            onApply={props.onApplySetup}
            onClose={handleCloseCustomSetup} />
      )}
    </div>
  )
}

export default Setup
