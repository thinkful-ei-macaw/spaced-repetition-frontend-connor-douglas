import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'


class LearningRoute extends Component {
  constructor() {
    super() 
    this.state = {
      nextWord: '',
      totalScore: 0,
      wordCorrectCount: 0,
      wordIncorrectCount: 0,
      head: {},
      submtted: false,
      incorrect: false,
      correct: true,
    }
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
  
  answerSubmit(e) {
    e.preventDefault();

    let reqBody = {"guess": e.target['learn-guess-input'].value}
    console.log(reqBody)
    let token = TokenService.getAuthToken()
    console.log(token)
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(data => {
          this.setState({
      submitted: true,
      incorrect: true,
    })
      console.log('i did a thing')
    })

  }

  render() {
    console.log(this.state.head.translation)
    return (
      <section>
        {!this.state.submitted && <h2>Translate the word:</h2>}
        {this.state.submitted && this.state.incorrect && <h2>Good try, but not quite right :(</h2>}
        
        <span>{this.state.nextWord}</span>
        
        {!this.state.submitted && <p>{`Your total score is: ${this.state.totalScore}`}</p>}
        {this.state.submitted && <section className='DisplayScore'><p>{`Your total score is: ${this.state.totalScore}`}</p></section>}
        
        {!this.state.submitted &&<form onSubmit={e => this.answerSubmit(e)}>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input id='learn-guess-input' type='text' required></input>
          <button type='submit'>Submit your answer</button>
        </form>}
        {this.state.submitted && this.state.incorrect && <section className='DisplayFeedback'><p>The correct translation for {this.state.nextWord} was {this.state.head.translation}</p></section>}
        You have answered this word correctly {this.state.wordCorrectCount} times.
        You have answered this word incorrectly {this.state.wordIncorrectCount} times.
      </section>
    );
  }
}

export default LearningRoute
