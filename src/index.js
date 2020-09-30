import React, { Component } from "react";
import ReactDOM from "react-dom";
import Player from "./component/player";
import rock from './assets/rock.png';
import paper from './assets/paper.png';
import "./styles.css";

const weapons = ["rock", "paper", "scissors"];
class App extends Component {
  state = {
    playerOne: weapons[0],
    playerTwo: weapons[0],
    winner: "",
    playerOneScore: 0,
    playerTwoScore: 0,
    mode: "player"

    
  };

  startGame = () => {
    let counter = 0;
    let gameInterval = setInterval(() => {
      counter++;

      if(this.state.mode === "computer"){
        this.setState({
          playerOne: weapons[Math.floor(Math.random() * weapons.length)],
          playerTwo: weapons[Math.floor(Math.random() * weapons.length)],
          winner: "",
        });
      }else{
        this.setState({
          playerTwo: weapons[Math.floor(Math.random() * weapons.length)],
          winner: "",
        });
      }
      
      if (counter > 5) {
        clearInterval(gameInterval);
        this.setState({
          winner: this.selectWinner(),
        });
      }
    }, 100);
  };


  endtGame = () => {
    let playerOneScore = 0, playerTwoScore = 0;

    const playerOneScoreValue = localStorage.clear("playerOneScore");
    const playerTwoScoreValue = localStorage.clear("playerTwoScore");
    // playerOneScore = parseInt(playerOneScoreValue === null ? 0 : playerOneScoreValue);
    // playerTwoScore = parseInt(playerTwoScoreValue === null ? 0 : playerTwoScoreValue);

    this.setState({
      playerOneScore,
      playerTwoScore,
    });
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
      const score = this.state.playerOneScore + 1;
      this.setState({
        playerOneScore: score,
      });
      localStorage.setItem("playerOneScore", score);
      // return true;
    } else {
      const score = this.state.playerTwoScore + 1;
      this.setState({
        playerTwoScore: score,
      });
      localStorage.setItem("playerTwoScore", score);
      // return true;
    }
  };

  componentDidMount() {
    let playerOneScore = 0, playerTwoScore = 0;

    const playerOneScoreValue = localStorage.getItem("playerOneScore");
    const playerTwoScoreValue = localStorage.getItem("playerTwoScore");
    const mode = localStorage.getItem("mode");
    playerOneScore = parseInt(playerOneScoreValue === null ? 0 : playerOneScoreValue);
    playerTwoScore = parseInt(playerTwoScoreValue === null ? 0 : playerTwoScoreValue);
    

    this.setState({
      playerOneScore,
      playerTwoScore,
      // mode,
    });
  }

onChangeValue = (event) => {

  // set to local storage
    localStorage.setItem("mode", event.target.value);

    this.setState({
      mode: event.target.value,
      playerOneScore: 0,
      playerTwoScore: 0,
      
    });
  }
  
  render() {
    const { playerOne, playerTwo, winner } = this.state;
    return (
      <>
      

        <div className="manin_wrapper">
          <div className="heading">
            <h1>Waste an hour having fun</h1>
            {/* <h3>Score : 48</h3> */}
          </div>
          <div className="mode_heading">
            <h3>Select Playing Mode:</h3>

            <div onChange={this.onChangeValue}>
              <input type="radio" value="player" name="mode" checked={this.state.mode === "player"} /> Player VS Computer
                <input type="radio" value="computer" name="mode" checked={this.state.mode === "computer"} /> Computer VS Computer
              </div>
          </div>


          <div className="fullwrapper">
            <div className="singlebox">
              {/* <img src={rock} /> */}
              <Player weapon={playerOne} />
              <h3>Player one<br /> ({this.state.mode === "player" ? "You" : "Computer"}): {this.state.playerOneScore} </h3>


            </div>
            <div className="singlebox bo">
              {/* <img src={paper} /> */}
              <Player weapon={playerTwo} />
              <h3>Player Two (Computer): <br /> {this.state.playerTwoScore} </h3>

            </div>
            {/* <div>
                  <Player weapon={playerOne} />
                  <Player weapon={playerTwo} />
                </div> */}
          </div>

          {this.state.mode === "player" && (
            <>

              <div className="buttons">
                <div className="bu">
                  <button
                    className="b1"
                    onClick={() => this.selectWeapon("rock")}
                  >
                    rock
                 </button>
                </div>
                <div className="bu">
                  <button
                    className="b1"
                    onClick={() => this.selectWeapon("paper")}
                  >
                    Paper
                 </button>
                </div>

                <div className="bu">
                  <button
                    className="b1"
                    onClick={() => this.selectWeapon("scissors")}
                  >
                    Scissor
                 </button>
                </div>

              </div>
            </>
          )}
          <div className="start">
            <button className="startb" onClick={this.startGame}> Start</button>
            <button className="endB" onClick={this.endtGame}> Reset</button>

          </div>

          <div className="end">
            


          </div>
        </div>

    </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
