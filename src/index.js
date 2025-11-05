#!/usr/bin/env node
import { ChessBoard } from "./chessBoard.js";

let G = new ChessBoard();
// console.log(G.toString());

// spot check a few cells to make sure all connected properly
// console.log(G.board[0][0]);
// console.log(G.board[3][3]);
// console.log(G.board[3][0]);
// console.log(G.board[6][7]);

// provided test set
console.log(G.knightMoves([0,0],[3,3]));
console.log(G.knightMoves([3,3],[0,0]));
console.log(G.knightMoves([0,0],[7,7]));
console.log(G.knightMoves([3,3],[4,3]));

// move to same position
console.log(G.knightMoves([5,5],[5,5]));
