import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'

class DashboardRoute extends Component {

  state = {
    language: {},
    words: []
  }

  componentDidMount() {
    let token = TokenService.getAuthToken()
    fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.words)
        this.setState({
          language: data.language,
          words: data.words,
        })
      })
  }

  render() {
    let language = this.state.language
    let words = this.state.words
    return (
      <section>
        <h2>{language.name}</h2>
    <p>Total correct answers: {language.total_score}</p>
        <a href='/learn'>Start practicing</a>
        <h3>Words to practice</h3>
        {words.map(word => {
          return (
            <li>
              <h4>{word.original}</h4>
              <p>{`correct answer count: ${word.correct_count}`}</p> <p>{`incorrect answer count: ${word.incorrect_count}`}</p>
            </li>
          )
        })}
      </section>
    );
  }
}

export default DashboardRoute
