class ChessBoard {
  #board;
  constructor() {
    // Create an 8x8 chessboard of Squares
    this.#board = Array.from({ length: 8 }, (_, i) =>
      Array.from({ length: 8 }, (_, j) => new Square(i, j))
    );

    this.#drawKnightGraph();
  }

  // Create the edges for the possible knight movements
  #drawKnightGraph() {
    const validKnightMoves = (i, j) => {
      // chose an anonymous function to keep the `this` context (didn't end up using)
      return [
        [i + 2, j - 1],
        [i + 2, j + 1],
        [i - 2, j - 1],
        [i - 2, j + 1],
        [i + 1, j - 2],
        [i + 1, j + 2],
        [i - 1, j - 2],
        [i - 1, j + 2],
      ].filter(
        ([potentialI, potentialJ]) =>
          potentialI >= 0 &&
          potentialI <= 7 &&
          potentialJ >= 0 &&
          potentialJ <= 7
      );
    };

    this.#board
      .flat()
      .forEach((square) =>
        square.neighbors.push(...validKnightMoves(square.i, square.j))
      );
  }

  knightMoves(pos1, pos2) {}

  // for testing
  get board() {
    return this.#board;
  }

  toString() {
    let s = "";
    this.#board.forEach((row) => {
      s += row.reduce(
        (rowStr, square) => (rowStr += ` ${square.toString()}`),
        "\n"
      );
    });
    return s;
  }
}

class Square {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.edges = [];
    this.visited = false;
  }

  toString() {
    return `(${this.i}, ${this.j})`;
  }
}

export { ChessBoard };
