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

  /**
   * Returns the shortest path between two positions via only knight movement.
   * It is a fact that there always exists a knight path between any two
   * positions in an 8x8 chess board.
   * @param {Array{Number}} posA [a_i, a_j] representing the starting square
   * @param {Array{Number}} posB [b_i, b_j] representing the ending square
   * @returns {Array{Array}} the shortest path from posA and posB, via an array
   * of indices of the squares in the path
   */
  knightMoves([a_i, a_j], [b_i, b_j]) {
    this.#board.flat().forEach((square) => {
      square.visited = false;
      square.prev = null;
    });
    const queue = []; // "we have queue at home"
    let currSquare = this.#board[a_i][a_j];
    queue.push(currSquare);
    // Loop can terminate early once found the node belonging to posB
    while (queue.length > 0) {
      currSquare = queue.shift();
      currSquare.visited = true;
      if (currSquare.i === b_i && currSquare.j === b_j) break; // Since there is provably a knight path to position b, this will execute eventually
      for (const [neighborI, neighborJ] of currSquare.neighbors) {
        const neighbor = this.#board[neighborI][neighborJ];
        if (neighbor.visited) continue;
        queue.push(neighbor);
        neighbor.prev = currSquare;
      }
    }

    // Found node belonging to posB
    const shortestPath = [];
    let pathTraveller = currSquare;
    shortestPath.push([pathTraveller.i, pathTraveller.j]);
    while (pathTraveller.prev) {
      pathTraveller = pathTraveller.prev;
      shortestPath.push([pathTraveller.i, pathTraveller.j]);
    }
    shortestPath.reverse();

    // Clean up
    this.#board.flat().forEach((square) => {
      square.visited;
      square.prev = null;
    });

    return shortestPath;
  }

  // For testing
  get board() {
    return this.#board;
  }

  // For testing
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
    this.neighbors = []; // does NOT store Square objects because a square from `this.#board` being modified will not be reflected here in `neighbors`
  }

  toString() {
    return `(${this.i}, ${this.j})`;
  }
}

export { ChessBoard };
