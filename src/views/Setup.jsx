import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SETUP_CONFIG = [
  {
    label: "Easy",
    width: 10,
    height: 10,
    mines: 10
  },
  {
    label: "Normal",
    width: 30,
    height: 30,
    mines: 30
  },
  {
    label: "Hard",
    width: 50,
    height: 50,
    mines: 50
  }
]

const Setup = (props) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [mines, setMines] = useState(0)

  const handleChange = (handler) => (e) => handler(e.target.value)
  const handleApplySetup = () => {
    props.onApplySetup({width, height, mines})
  }

  return (
    <div>
      {
        SETUP_CONFIG.map(setup => {
          const handleSetupClick = () => {
            setWidth(setup.width)
            setHeight(setup.height)
            setMines(setup.mines)
            
          }

          return <div onClick={handleSetupClick}>{setup.label}</div>

        }) 
      }
      <label>Width</label>
      <input onChange={handleChange(setWidth)} value={width} />      
      <label>Height</label>
      <input onChange={handleChange(setHeight)} value={height} />      
      <label>Mines</label>
      <input onChange={handleChange(setMines)} value={mines} />
      <div onClick={handleApplySetup}>Start</div>
    </div>
  )
}

export default Setup
