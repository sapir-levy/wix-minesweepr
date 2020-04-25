import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Board from './Board'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'

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

const BoardContainer = ({
  width, 
  height, 
  minesCount, 
  onWin, 
  onLose,
  onSupermanClick,
  supermanMode
}) => {
  const [field, setField] = useState([])
  const [mines, setMines] = useState({})
  const [minesLeft, setMinesLeft] = useState(minesCount)
  const [flagsLeft, setFlagsLeft] = useState(minesCount)
  const [cellsLeft, setCellsLeft] = useState((height * width) - minesCount)


  useEffect(() => {generateMines()}, [width, height, minesCount])

  useEffect(() => {setMineField()}, [mines])

  useEffect(() => {
    if(checkVictory()) {
      onWin()
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
        f[i][j] = {
          ...CELL,
          neighbors: getNeighbors(i, j),
          canRevealNeighbors: true
        }
      }
    }

    return f
  }

  const setMineField = () => {
    const f = initField()

    Object.values(mines).forEach(([mineX, mineY]) => { 
      const cell = f[mineX][mineY]
      cell.value = MINE

      for(let i = 0; i < cell.neighbors.length; i++) {
        const [nx, ny] = cell.neighbors[i]
        const neighbor = f[nx][ny]

        neighbor.canRevealNeighbors = false

        if(neighbor.value !== MINE) {
          neighbor.value++
        }
      }
    })

    setField(f)
  }

  const getNeighbors = (cellX, cellY) => {
    const n = NEIGHBORS.reduce((neighbors, [x, y]) => {
      const neighborX = cellX + x
      const neighborY = cellY + y

      if(neighborX > -1 && neighborX < width && neighborY > -1 && neighborY < height) {
        neighbors.push([neighborX, neighborY])
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

  const revealNeighbors = (f, cell) => {
    let revealed = 0

    if(!cell.canRevealNeighbors) {
      return revealed
    }

    let neighborsToReveal = [...cell.neighbors]

    while(!isEmpty(neighborsToReveal)) {
      let [nx, ny] = neighborsToReveal.shift()
      let neighbor = f[nx][ny]

      if(neighbor.status !== CellStatus.Revealed) {
        f[nx][ny].status = CellStatus.Revealed
        revealed++

        if(neighbor.canRevealNeighbors) {
          neighborsToReveal = neighborsToReveal.concat(neighbor.neighbors)
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
      onLose()
    }
    else {
      f[cellX][cellY].status = CellStatus.Revealed
      revealed++
      revealed += revealNeighbors(f, cell)
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
      onReveal={handleRevealClick}
      onSupermanClick={onSupermanClick}
      supermanMode={supermanMode} />
  )
}

BoardContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired, 
  minesCount: PropTypes.number.isRequired,
  onWin: PropTypes.func.isRequired,
  onLose: PropTypes.func.isRequired,
  onSupermanClick: PropTypes.func.isRequired,
  supermanMode: PropTypes.bool.isRequired
}

export default BoardContainer