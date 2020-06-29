import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./words.js";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      word: "",
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  /**
    Checks to see if set is a super set of subset 
   */
  isSuperset(set, subset) {
    for (let elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    if (this.state.nWrong < this.props.maxWrong) {
      return this.state.answer
        .split("")
        .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
    } else if (this.state.nWrong > this.props.maxWrong - 1) {
      return this.state.answer.split("");
    }
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  handleRestart() {
    this.setState((st) => ({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    let winner = this.isSuperset(this.state.guessed, this.state.answer);
    if (this.state.nWrong > this.props.maxWrong - 1 || winner) {
      return (
        <button onClick={this.handleRestart} style={{ width: 200 }}>
          Restart
        </button>
      );
    } else {
      return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
        <button
          value={ltr}
          onClick={this.handleGuess}
          disabled={this.state.guessed.has(ltr)}
          key={ltr}
        >
          {ltr}
        </button>
      ));
    }
  }

  /** render: render game */

  render() {
    let winner = this.isSuperset(this.state.guessed, this.state.answer);
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={
            this.state.nWrong +
            " out of " +
            this.props.maxWrong +
            " wrongly guessed"
          }
        />
        <h2>
          {" "}
          {this.state.nWrong > 0 &&
            this.state.nWrong < this.props.maxWrong &&
            "Wrong Guesses: " + this.state.nWrong}
          {this.state.nWrong > this.props.maxWrong - 1 && "You Lose!"}
        </h2>
        <h2>{winner && "You Win!"}</h2>
        <p className="Hangman-word">{this.guessedWord()}</p>
        <p className="Hangman-btns">{this.generateButtons()}</p>
      </div>
    );
  }
}

export default Hangman;
