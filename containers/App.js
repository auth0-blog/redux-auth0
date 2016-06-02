import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadJedis, loadJedi, login, logout } from '../actions'
import JedisList from '../components/JedisList'
import Jedi from '../components/Jedi'
import Auth from '../components/Auth'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleGetJedisClick = this.handleGetJedisClick.bind(this)
    this.handleGetJediClick = this.handleGetJediClick.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleGetJedisClick() {
    this.props.loadJedis()
  }
  
  handleGetJediClick(id) {
    this.props.loadJedi(id)
  }
  
  handleLoginClick() {
    this.props.login()
  }
  
  handleLogoutClick() {
    this.props.logout()
  }

  render() {
    const { allJedis, singleJedi, error, isAuthenticated, profile } = this.props
    return (
      <div>
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <a className="navbar-brand">Redux Jedi</a>
            <Auth 
              isAuthenticated={isAuthenticated}
              profile={profile}
              onLoginClick={this.handleLoginClick}
              onLogoutClick={this.handleLogoutClick}
            />
          </div>
        </div>

        <div className="container-fluid">
          <JedisList
            jedis={allJedis}
            error={error}
            onClick={this.handleGetJedisClick}
            onGetJediClick={this.handleGetJediClick}
            isAuthenticated={isAuthenticated}
          />
          <Jedi jedi={singleJedi} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { jedis, jedi, auth } = state
  const { allJedis, error } = jedis
  const { singleJedi } = jedi
  const { isAuthenticated, profile } = auth
  return {
    allJedis,
    singleJedi,
    error,
    isAuthenticated,
    profile
  }
}

export default connect(mapStateToProps, {
  loadJedis,
  loadJedi,
  login,
  logout
})(App)
