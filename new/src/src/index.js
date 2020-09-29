import React, { Component } from "react";
import ReactDOM from "react-dom";
import Player from "./component/player";
import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
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
      mode,
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
        <div className ="main_area">
          <div className="continer">
          <h1 className ="header_title" style={{ textAlign: "center" }}>Waste an hour having fun</h1>

          <h3>Select Playing Mode:</h3>
          <div onChange={this.onChangeValue}>
            <input type="radio" value="player" name="mode" checked={this.state.mode === "player"} /> Player VS Computer
            <input type="radio" value="computer" name="mode" checked={this.state.mode === "computer"} /> Computer VS Computer
          </div>

          <div className ="game_board">
            <h3>Score:</h3>
            <h4>Player One ({this.state.mode === "player" ? "You" : "Computer"}): {this.state.playerOneScore}</h4>
            <h4>Player Two (Computer): {this.state.playerTwoScore}</h4>
          </div>

          <div>
            <Player weapon={playerOne} />
            <Player weapon={playerTwo} />
          </div>
          {this.state.mode === "player" && (
            <>
            <div className ="pick_item">
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
            </>
          )}
          <div className="winner">{winner ? this.selectWinner() : null}</div>
          <button type="button" onClick={this.startGame}>

          Start!</button>
          
          <button type="button" onClick={this.endtGame}>
            End/Reset</button>!
        </div>
        </div>

          
          <div className="manin_wrapper">
              <div className="heading">
                    <h1>Waste an hour having fun</h1>
                    <h3>Score : 48</h3>
              </div>


              <div className="fullwrapper">
                <div className="singlebox">
                    <img src={img1} />
                    <h3>Player one (You) <br/> 0 </h3>
                </div>
                <div className="singlebox bo">
                    <img src={img2} />
                    <h3>Player one (You) <br/> 1 </h3>
                </div>
              </div>

              <div className="buttons"> 
                  <div className="bu">
                      <button className="b1"> Rock</button>
                  </div>
                  <div className="bu">
                      <button className="b1"> Paper </button>
                  </div>
                  <div className="bu">
                      <button className="b1"> Scissor</button>
                  </div>
              </div>
              <div className="start">
                   <button className="startb"> Start</button>
                   
              </div>
          </div>






      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
