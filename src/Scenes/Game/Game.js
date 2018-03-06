import Board from './Components/Board.js';
import { gameService as app } from '/src/Services/GameService.js';

export class Game extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.init();
  }

  init() {
    const sqrs = Array(9).fill(null);
    for(var sqr in sqrs) {
      sqrs[sqr] = {
        val:null,
        x:null,
        y:null,
        current:false,
        win:false
      };
    }

    this.setState({
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
      order:'asc'
    });

  }

  clearHighlight(squares) {
    const sqrs = [...squares];
    for(var sqr in sqrs) {
      sqrs[sqr].current = false;
    }

    return sqrs;
  }

  handleClick(i) {

    var history = [...this.state.history];
    if(this.state.order === 'desc'){
      history = history.reverse();
      history = history.slice(0, history.length - this.state.stepNumber);
    } else {
      history = history.slice(0, this.state.stepNumber + 1);
    }

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

    var next = !this.state.xIsNext;
    if(this.state.order === 'desc'){
      next = this.state.xIsNext;
    }

    var hist = history.concat([{
      squares: squares,
      move: squares[i]
    }]);

    var toStep = (this.state.order !== 'desc') ? hist.length - 1: 0;
    if(this.state.order === 'desc') {
      this.setState({
        history: hist.reverse(),
        stepNumber: toStep,
        xIsNext: !next,
      });

    } else {
      this.setState({
        history: hist,
        xIsNext: next,
        stepNumber: toStep,
      });
    }
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

    var next = (move % 2) === 0;
    if(this.state.order === 'desc'){
      next = !((move % 2) === 0)
    }

    this.setState({
      stepNumber: move,
      xIsNext: next,
    });
  }

  toggleOrder(){
    var toOrder = (this.state.order === 'asc') ? 'desc' : 'asc';
    var toStep = (toOrder === 'asc') ? this.state.history.length - 1 : 0;
    var reversedHistory = [...this.state.history];
    reversedHistory.reverse();

    this.setState({
      order:toOrder,
      history: reversedHistory,
      stepNumber: toStep,
      xIsNext: this.state.xIsNext,
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
    } else if(!winner && history.length === 10) {
      status = 'It\'s a Draw!';
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
          <div><button onClick={() => this.init()}>Restart Game</button></div>
          <div><button onClick={() => this.toggleOrder()}>Toggle Order - current order: {this.state.order}</button></div>
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}
