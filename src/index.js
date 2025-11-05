#!/usr/bin/env node
import { ChessBoard } from "./chessBoard.js";

let G = new ChessBoard();
console.log(G.toString());

// spot check a few cells
console.log(G.board[0][0]);
console.log(G.board[3][3]);
console.log(G.board[3][0]);
console.log(G.board[6][7]);
