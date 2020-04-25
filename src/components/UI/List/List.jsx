import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

const List = ({className, listItems, renderItem}) => {
  return (
    <ul className={className}>
      {
        map(listItems, (item, i) => (
          <li key={item.id || i}>
            {renderItem(item, i)}
          </li>
        ))
      }
    </ul>
  )
}

List.propTypes = {
  listItems: PropTypes.oneOfType([
    PropTypes.object, 
    PropTypes.array
  ]).isRequired,
  render: PropTypes.func.isRequired
}

export default List
