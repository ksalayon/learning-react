
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var app = (function() {
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

  const squares = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  var getLines = function(){
    return lines;
  };
  var getSquares = function(){
    return squares;
  };

  var calculateWinner = function(squares){
    return ((sqrs) => {
      const lines = this.getLines();
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (sqrs[a].val && sqrs[a].val === sqrs[b].val && sqrs[a].val === sqrs[c].val) {
          return sqrs[a];
        }
      }
      return null;
    })(squares);
  };

  return {
      getLines: getLines,
      getSquares: getSquares,
      calculateWinner: calculateWinner
  };

})();

function Square (props) {
  return (
    <button className={(props.current) ? 'current square' : 'square'} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square
      value={this.props.squares[i].val}
      key={'col' + i}
      current={this.props.squares[i].current}
      onClick={() => this.props.onClick(i)}
    />;
  }

  renderBoard(){
    return app.getSquares().map((row, idx) => {
      return <div key={'row' + idx} className="board-row">
        {
          row.map((col, index) => {
            return this.renderSquare(col);
          })
        }
      </div> ;

    });
  }

  render() {
    return (
      <div>
        {this.renderBoard()}
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
        y:null,
        current:false
      };
    }

    this.state = {
      history: [{
        squares: sqrs,
        move: {
          val: null,
          x: null,
          y: null
        }
      }],
      xIsNext: true,
      stepNumber: 0,
      currentSquare: null,
      order:'asc'
    };
  }

  clearHighlight(squares) {
    const sqrs = [...squares];
    for(var sqr in sqrs) {
      sqrs[sqr].current = false;
    }

    return sqrs;
  }

  handleClick(i) {

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = this.clearHighlight(current.squares);

    if (app.calculateWinner(squares) || squares[i].val) {
      return;
    }

    squares[i] = Object.assign({}, {
      val: this.state.xIsNext ? 'X' : 'O',
      x: (((i+1) % 3) === 0) ? 3 : ((i+1) % 3),
      y: Math.ceil(((i+1)/3)),
      current: true
    });

    this.setState({
      history: history.concat([{
        squares: squares,
        move: squares[i]
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(move, step) {
    if(move){
      step.squares.map(function(sqr){
        if(sqr.x === step.move.x && sqr.y === step.move.y && sqr.val === step.move.val){
          sqr.current = true;
        } else {
          sqr.current = false;
        }
      });
    }

    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) === 0,
    });
  }

  toggleOrder(){
    var toOrder = (this.state.order === 'asc') ? 'desc' : 'asc';
    var toStep = (toOrder === 'asc') ? this.state.history.length - 1 : 0;
    var reversedHistory = [...this.state.history];
    reversedHistory.reverse();
    console.log('toStep: ', toStep, 'toOrder', toOrder);
    this.setState({
      order:toOrder,
      history: reversedHistory,
      stepNumber: toStep,
      xIsNext: (toStep % 2) === 0,
    });
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = app.calculateWinner(current.squares);
    const moves = history.map((step, move) => {

      const desc = (step.move.val !== null) ?
        'Go to move #' + move + '(x: ' + step.move.x + ' y: '+ step.move.y +')':
        'Go to game start';

      return (
        <li  key={move}>
        <button onClick={() => this.jumpTo(move, step)}>{desc}</button>
        </li>
      );
   });

    let status;
    if (winner) {
      status = 'Winner: ' + winner.val;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div><button onClick={() => this.toggleOrder()}>Toggle Order - current order: {this.state.order}</button></div>
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
