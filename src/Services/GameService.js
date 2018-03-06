
var gameService = (function() {
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
          sqrs[a].win = true;
          sqrs[b].win = true;
          sqrs[c].win = true;
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

export { gameService };
