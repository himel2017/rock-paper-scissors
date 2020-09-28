import React, { Component } from "react";
import ReactDOM from "react-dom";
import Player from "./player";
import "./styles.css";

const weapons = ["rock", "paper", "scissors"];
class App extends Component {
  state = {
    playerOne: weapons[0],
    playerTwo: weapons[0],
    winner: "",
    playerOneScore: 0,
    playerTwoScore: 0,
  };

  startGame = () => {
    let counter = 0;
    let gameInterval = setInterval(() => {
      counter++;
      this.setState({
        playerTwo: weapons[Math.floor(Math.random() * weapons.length)],
        winner: "",
      });
      if (counter > 5) {
        clearInterval(gameInterval);
        this.setState({
          winner: this.selectWinner(),
        });
      }
    }, 100);
  };

  selectWinner = () => {
    const { playerOne, playerTwo } = this.state;

    if (playerOne === playerTwo) {
      return "Oops it's a Tie!";
    } else if (
      (playerOne === "rock" && playerTwo === "scissors") ||
      (playerOne === "scissors" && playerTwo === "paper") ||
      (playerOne === "paper" && playerTwo === "rock")
    ) {
      this.resultIncrement(1);
      // return "Player One Wins!";
    } else {
      this.resultIncrement(2);
      // return "Player Two Wins!";
    }
  };
  selectWeapon = (weapon) => {
    this.setState({
      playerOne: weapon,
      winner: "",
    });
  };
  resultIncrement = (value) => {
    if (value === 1) {
      this.setState({
        playerOneScore: this.state.playerOneScore + 1,
      });
      // return true;
    } else {
      this.setState({
        playerTwoScore: this.state.playerTwoScore + 1,
      });
      // return true;
    }
  };
  render() {
    const { playerOne, playerTwo, winner } = this.state;
    return (
      <>
        <div style={{ backgroundColor: "#05E38A" }}>
          <h1 style={{ textAlign: "center" }}>Rock Paper Scissors</h1>
          <div>
            <h3>Score:</h3>
            <h4>Player One (You): {this.state.playerOneScore}</h4>
            <h4>Player Two (Computer): {this.state.playerTwoScore}</h4>
          </div>

          <div>
            <Player weapon={playerOne} />
            <Player weapon={playerTwo} />
          </div>
          <div>
            <button
              className="weaponBtn"
              onClick={() => this.selectWeapon("rock")}
            >
              rock
            </button>
            <button
              className="weaponBtn"
              onClick={() => this.selectWeapon("paper")}
            >
              paper
            </button>
            <button
              className="weaponBtn"
              onClick={() => this.selectWeapon("scissors")}
            >
              scissor
            </button>
          </div>
          <div className="winner">{winner ? this.selectWinner() : null}</div>
          <button type="button" onClick={this.startGame}>
            Start!
          </button>
        </div>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
