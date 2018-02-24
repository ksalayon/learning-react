
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square
      value={this.props.squares[i].val}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    const sqrs = Array(9).fill(null);
    for(var sqr in sqrs) {
      sqrs[sqr] = {
        val:null,
        x:null,
        y:null
      };
    }

    this.state = {
      history: [{
        squares: sqrs,
      }],
      xIsNext: true,
      stepNumber: 0,
      currentSquare: null
    };
  }

  handleClick(i) {
    // const history = this.state.history;
    console.log('this.state.history: ', this.state.history);
    console.log('this.state.stepNumber: ', this.state.stepNumber);

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    console.log('history at click: ', history);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      // console.log('winner!');
      //TODO: Implement correctly with new data structure
      // return;
    }

    squares[i].val = this.state.xIsNext ? 'X' : 'O';
    squares[i].x = (((i+1) % 3) === 0) ? 3 : ((i+1) % 3);
    squares[i].y = ((Math.round((i+1)/3)) + 1);

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      currentSquare: squares[i]
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move + ' (x: ' + this.state.currentSquare.x + ' y: ' + this.state.currentSquare.y + ')':
      'Go to game start';
     return (
       <li  key={move}>
         <button onClick={() => this.jumpTo(move)}>{desc}</button>
       </li>
     );
   });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a].val && squares[a].val === squares[b].val && squares[a].val === squares[c].val) {
      return squares[a];
    }
  }
  return null;
}
