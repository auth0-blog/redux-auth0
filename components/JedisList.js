import React, { Component, PropTypes } from 'react'

function getJediListItem(jedi, isAuthenticated, onClick) {
  return(
    <li key={jedi.id} className="list-group-item">
      { isAuthenticated ? (
        <a onClick={() => onClick(jedi.id)}><h4 style={{ cursor: 'pointer' }}>{jedi.name}</h4></a>
      ) : (
        <h4>{jedi.name}</h4>
      )}
    </li>
  )
}
export default class JedisList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { jedis, error, onClick, onGetJediClick, isAuthenticated } = this.props
    const jedisList = jedis.map(jedi => getJediListItem(jedi, isAuthenticated, onGetJediClick))
    return (
      <div className="col-sm-3">
        <button className="btn btn-primary" onClick={onClick} style={{ marginBottom: '10px' }}>Get Jedis</button>
        { jedis &&
          <ul className="list-group">
            {jedisList}
          </ul>
        }
        { error &&
          <span className="text-danger">{error}</span>
        }
      </div>
    )
  }
}
