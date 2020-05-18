import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'

class DashboardRoute extends Component {

  componentDidMount() {
    let token = TokenService.getAuthToken()
    fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }
  render() {
    return (
      <section>
        <h2>Latin</h2>
        <p>Total correct answers: language total score</p>
        <a href='/learn'>Start practicing</a>
        <h3>Words to practice</h3>
      </section>
    );
  }
}

export default DashboardRoute
