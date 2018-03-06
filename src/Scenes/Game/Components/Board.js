import React from 'react';
import Square from './Square.js';
import { gameService as app } from '../../../Services/GameService.js';

export default class Board extends React.Component {

  renderSquare(i) {
    return <Square
      value={this.props.squares[i].val}
      key={'col' + i}
      current={this.props.squares[i].current}
      onClick={() => this.props.onClick(i)}
      win={this.props.squares[i].win}
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
