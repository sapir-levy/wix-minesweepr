import React, {useState, useEffect} from 'react'
import BoardRow from './Row'
import cloneDeep from 'lodash/cloneDeep'

const NEIGHBORS = Object.freeze([
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],  /* * */  [1, 0],
  [-1, 1],  [0, 1],  [1, 1],
])

const MINE = '*'
const EMPTY_CELL = 0
const CellStatus = {
  Unknown: 'unknown',
  Revealed: 'revealed',
  Flagged: 'flagged',
  Exploded: 'exploaded'
}

const CELL = {
  value: EMPTY_CELL,
  status: CellStatus.Unknown
}

const Board = ({width, height, minesCount}) => {
  const [field, setField] = useState([])
  const [mines, setMines] = useState({})
  const [minesLeft, setMinesLeft] = useState(minesCount)
  const [flagsLeft, setFlagsLeft] = useState(minesCount)
  const [cellsLeft, setCellsLeft] = useState((height * width) - minesCount)

  useEffect(() => {
    generateMines()
  }, [])

  useEffect(() => {
    setMineField()
  }, [mines])

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
        if(f[nx][ny].value != MINE) {
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

        if(cell.value == MINE) {
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
    let hasMine = false
    for(let i = 0; i < neighbors.length; i++) {
      const [nx, ny] = neighbors[i]
      const neighbor = f[nx][ny]

      if(neighbor.value == MINE || neighbor.status == CellStatus.Flagged) {
        hasMine = true
        break
      }
    }

    if(!hasMine) {
      for(let i = 0; i < neighbors.length; i++) {
        const [nx, ny] = neighbors[i]
        const neighbor = f[nx][ny]

        if(neighbor.status != CellStatus.Revealed) {
          revealCell(f, nx, ny)
        }
      }
    }
  }

  const revealCell = (f, cellX, cellY) => {
    const cell = f[cellX][cellY]
    if(cell.status == CellStatus.Revealed || cell.status == CellStatus.Flagged) {
      return
    }
    else if(cell.value == MINE) {
      console.log("YOU LOSE!")
    }
    //else if win
    else {
      f[cellX][cellY].status = CellStatus.Revealed
      revealNeighbors(f, cellX, cellY)
    }
  }

  const handleReveal = (cellX, cellY) => {
    const f = cloneDeep(field)
    revealCell(f, cellX, cellY)
    setField(f)
  }

  return (
    <div className="board">
      {field.map((row, ri) => {
        return (
          <BoardRow 
            key={ri} 
            cells={row}
            onFlag={(ci) => handleFlagClick(ri, ci)}
            onReveal={(ci) => handleReveal(ri, ci)} />
        )
      })}
    </div>
  )
}

Board.propTypes = {
  
}

export default Board
