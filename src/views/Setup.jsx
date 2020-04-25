import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Setup = (props) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [mines, setMines] = useState(0)

  const handleChange = (handler) => (e) => handler(e.target.value)

  return (
    <div>
      <label>Width</label>
      <input onChange={handleChange(setWidth)} value={width} />      
      <label>Height</label>
      <input onChange={handleChange(setHeight)} value={height} />      
      <label>Mines</label>
      <input onChange={handleChange(setMines)} value={mines} />
      <Link to={{ pathname: "/game", state: {width, height, mines} }}>Start</Link>
    </div>
  )
}

export default Setup
