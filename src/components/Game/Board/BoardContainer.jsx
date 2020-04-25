import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Board from './Board'
import cloneDeep from 'lodash/cloneDeep'

const NEIGHBORS = Object.freeze([
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],  /* * */  [1, 0],
  [-1, 1],  [0, 1],  [1, 1],
])

const MINE = '*'

const CellStatus = {
  Unknown: 'unknown',
  Revealed: 'revealed',
  Flagged: 'flagged',
  Exploded: 'exploaded'
}

const EMPTY_CELL = 0

const CELL = {
  value: EMPTY_CELL,
  status: CellStatus.Unknown
}

const BoardContainer = ({width, height, minesCount}) => {
  const [field, setField] = useState([])
  const [mines, setMines] = useState({})
  const [minesLeft, setMinesLeft] = useState(minesCount)
  const [flagsLeft, setFlagsLeft] = useState(minesCount)
  const [cellsLeft, setCellsLeft] = useState((height * width) - minesCount)


  useEffect(() => {generateMines()}, [width, height, minesCount])

  useEffect(() => {setMineField()}, [mines])

  useEffect(() => {
    if(checkVictory()) {
      alert("you win!")
    }
  }, [minesLeft, flagsLeft, cellsLeft])

  const checkVictory = () => minesLeft === 0 && cellsLeft === 0

  const generateMines = () => {
    const m = {}

    for(let i = 0; i < minesCount; i++) {
      const mineX = Math.floor(Math.random() * width);
      const mineY = Math.floor(Math.random() * height);

      if(!m[[mineX, mineY]]) {
        m[[mineX, mineY]] = [mineX, mineY]
      }
      else {
        i--
      }
    }

    setMines(m)
  }

  const initField = () => {
    let f = []

    for(let i = 0; i < width; i++) {
      f[i] = []

      for(let j = 0; j < height; j++) {
        f[i][j] = {...CELL}
      }
    }

    return f
  }

  const setMineField = () => {
    const f = initField()

    Object.values(mines).forEach(([mineX, mineY]) => { 
      f[mineX][mineY].value = MINE

      const neighbors = getNeighbors(f, mineX, mineY)

      for(let i = 0; i < neighbors.length; i++) {
        const [nx, ny] = neighbors[i]
        if(f[nx][ny].value !== MINE) {
          f[nx][ny].value++
        }
      }
    })

    setField(f)
  }

  const getNeighbors = (f, i, j) => {
    const n = NEIGHBORS.reduce((neighbors, [x, y]) => {
      const ni = i + x
      const nj = j + y

      if(ni > -1 && ni < width && nj > -1 && nj < height) {
        neighbors.push([ni, nj])
      }

      return neighbors
    }, [])

    return n
  }


  const handleFlagClick = (cellX, cellY) => {
    const f = cloneDeep(field)
    const cell = field[cellX][cellY]
    let newStatus

    switch(cell.status) {
      case CellStatus.Unknown:
        newStatus = CellStatus.Flagged
        setFlagsLeft(flagsLeft - 1)

        if(cell.value === MINE) {
          setMinesLeft(minesLeft - 1)
        }

        break
      case CellStatus.Flagged:
        newStatus = CellStatus.Unknown
        setFlagsLeft(flagsLeft + 1)
        break
      default:
        newStatus = cell.status
    }

    f[cellX][cellY].status = newStatus

    setField(f)
  }

  const revealNeighbors = (f, cellX, cellY) => {
    const neighbors = getNeighbors(f, cellX, cellY)
    let hasMine = false, revealed = 0

    for(let i = 0; i < neighbors.length; i++) {
      const [nx, ny] = neighbors[i]
      const neighbor = f[nx][ny]

      if(neighbor.value === MINE && neighbor.status !== CellStatus.Flagged) {
        hasMine = true
        break
      }
    }

    if(!hasMine) {
      for(let i = 0; i < neighbors.length; i++) {
        const [nx, ny] = neighbors[i]
        const neighbor = f[nx][ny]

        if(neighbor.status !== CellStatus.Revealed) {
          revealed += revealCell(f, nx, ny)
        }
      }
    }

    return revealed
  }

  const revealCell = (f, cellX, cellY) => {
    const cell = f[cellX][cellY]
    let revealed = 0
    if(cell.status === CellStatus.Revealed || cell.status === CellStatus.Flagged) {
      return revealed
    }
    else if(cell.value === MINE) {
      alert("you are a loser!")
    }
    else {
      f[cellX][cellY].status = CellStatus.Revealed
      revealed++
      revealed += revealNeighbors(f, cellX, cellY)
    }

    return revealed
  }

  const handleRevealClick = (cellX, cellY) => {
    const f = cloneDeep(field)
    const revealed = revealCell(f, cellX, cellY)

    setField(f)
    setCellsLeft(cellsLeft - revealed)
  }

  return (
    <Board 
      mineField={field}
      flagsLeft={flagsLeft}
      onFlag={handleFlagClick}
      onReveal={handleRevealClick} />
  )
}

BoardContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired, 
  minesCount: PropTypes.number.isRequired
}

export default BoardContainer