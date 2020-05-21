import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import './LearningRoute.css';

class LearningRoute extends Component {
  
  state = {
    nextWord: '',
    totalScore: 0,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    answer: '',
    isCorrect: null,
    submitted: false,
    guess: '',
    previousWord: ''
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
      })
    })
  }
  
  answerSubmit(e) {
    e.preventDefault();
    let reqBody = {"guess": e.target['learn-guess-input'].value}
    let token = TokenService.getAuthToken()
    let previousWord = this.state.nextWord
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
            totalScore: data.totalScore,
            answer: data.answer,
            isCorrect: data.isCorrect,
            submitted: true,
            guess: reqBody.guess,
            nextWord: data.nextWord,
            previousWord: previousWord,
            wordCorrectCount: data.wordCorrectCount,
            wordIncorrectCount: data.wordIncorrectCount
    })
    })

  }

  onNextWordClick(e) {
    e.preventDefault()
    this.setState({
      submitted:!this.state.submitted
    })
  }

  render() {
    
    return (
      <section className='learning-page'>
        {!this.state.submitted && <h2 className='translate-word'>Translate the word:</h2>}
        {this.state.submitted && !this.state.isCorrect && <h2>Good try, but not quite right :(</h2>}
        {this.state.submitted && this.state.isCorrect && <h2>You were correct! :D</h2>}
        
        {!this.state.submitted && <span className='word-to-translate'>{this.state.nextWord}</span>}
                
        {!this.state.submitted && <p className='score-value'>{`Your total score is: ${this.state.totalScore}`}</p>}
        {this.state.submitted && <section className='DisplayScore'><p className='score-value'>Your total score is: {this.state.totalScore}</p></section>}
  


        {!this.state.submitted && <form onSubmit={e => this.answerSubmit(e)} className='guess-form'>
          <label htmlFor='learn-guess-input' className='guess-label'>What's the translation for this word?</label>
          <input id='learn-guess-input' type='text' required></input>
          <button type='submit' className='submit-guess-button'>Submit your answer</button>
        </form>}
        {this.state.submitted && !this.state.isCorrect && 
        <section className='DisplayFeedback'>
          <p>
            The correct translation for {this.state.previousWord} was {this.state.answer} and you chose {this.state.guess}!
          </p>
          <button type='button' className='try-another-button' onClick={e => this.onNextWordClick(e)}>Try another word!</button>
        </section>}
        {this.state.submitted && this.state.isCorrect &&
        <section className='DisplayFeedback'>
          <p className='correct-translation'>
            The correct translation for {this.state.previousWord} was {this.state.answer} and you chose {this.state.guess}!
          </p>
          <button type='button' className='try-another-button' onClick={e => this.onNextWordClick(e)}>Try another word!</button>
        </section>
        }

        {!this.state.submitted && 
          <div className='correct-counts'>
            <span className='count-span'>You have answered this word correctly {this.state.wordCorrectCount} times. </span>
            <span className='count-span'>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</span>
          </div>}
      </section>
    );
  }
}

export default LearningRoute
