import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'


class LearningRoute extends Component {
  
  state = {
    nextWord: '',
    totalScore: 0,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    head: []
  }

componentDidMount() {
  let token = TokenService.getAuthToken()
    fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        nextWord: data.nextWord,
        totalScore: data.totalScore,
        wordCorrectCount: data.wordCorrectCount,
        wordIncorrectCount: data.wordIncorrectCount,
        head: data.head
      })
    })
  }
  
  render() {

    return (
      <section>
        <h2>Translate the word:</h2>
        <span>{this.state.nextWord}</span>
        <p>Your total score is: {this.state.totalScore}</p>
        
        <form>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input id='learn-guess-input' type='text' required></input>
          <button type='submit'>Submit your answer</button>
        </form>
        You have answered this word correctly {this.state.wordCorrectCount} times.
        You have answered this word incorrectly {this.state.wordIncorrectCount} times.
      </section>
    );
  }
}

export default LearningRoute
