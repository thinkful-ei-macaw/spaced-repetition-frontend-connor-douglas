import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import './DashboardRoute.css';

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
      <section className='dashboard-page'>
        <h2>{language.name}</h2>
        <p>Total correct answers: {language.total_score}</p>
        <a href='/learn'>Start practicing</a>
        <div className='practice-words'>
          <h3>Words to practice</h3>
          <ul>
          {words.map((word, idx) => {
            return (
              <li key={idx}>
                <h4>{word.original}</h4>
                <div>
                  <p>{`correct answer count: ${word.correct_count}`}</p> 
                  <p>{`incorrect answer count: ${word.incorrect_count}`}</p>
                </div>
              </li>
            )
          })}
          </ul>
        </div>
        
      </section>
    );
  }
}

export default DashboardRoute
