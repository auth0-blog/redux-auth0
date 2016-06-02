import React, { Component, PropTypes } from 'react'

export default class Jedi extends Component {

  render() {
    const { jedi } = this.props
    return (
      <div className="col-sm-9">
        { jedi &&
          <div>
            <h2>{jedi.name}</h2>
            <img src={jedi.image} />
          </div>
        }
      </div>
    )
  }
}
