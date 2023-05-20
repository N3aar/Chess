import WSClient from '../websocket.js';
import moves from './moves.js';
import paths from './paths.js';

import { draw, loadImages, getMousePosition } from './canvas.js';
import { isOutsideBoard, transformMouseToGridPosition, equalsPosition, reverseBoard, getSquareByPosition, isEmptySquare } from './utils.js';

const game = {
  color: "",
  selected: null,
  images: {},
  board: []
}

const createSquare = position => ({ x: position.x, y: position.y, piece: null })
const createPiece = (type, color) => ({ type, color })

const createBoard = pieces => {
  game.board.length = 0;

  for (let file = 0; file < 8; file++) {
    game.board[file] = [];

    for (let rank = 0; rank < 8; rank++)
      game.board[file][rank] = createSquare({ x: rank, y: file });
  }

  for (const square of pieces) {
    const piece = createPiece(square.type, square.color);

    if (square.start)
      piece.start = true;

    game.board[square.y][square.x].piece = piece;
  }
}

const removePiece = (board, position) => {
  if (isEmptySquare(board, position))
    return;

  board[position.y][position.x].piece = null;
}

const addPiece = (board, type, color, position) => {
  if (!type || !color || isOutsideBoard(position))
    return;

  board[position.y][position.x].piece = createPiece(type, color);
}

const movePiece = (board, position, to) => {
  const square = getSquareByPosition(game.board, position);
  const piece = square && square.piece;

  if (!square || !square.piece)
    return;

  removePiece(board, position);
  addPiece(board, piece.type, piece.color, to);
}

const resetSelectedPiece = () => {
  game.selected = null;
  draw(game);
}

const selectPiece = (square, position) => {
  if (equalsPosition(game.selected, square))
    return resetSelectedPiece();

  const dx = Math.abs(game.selected.x - position.x);
  const dy = Math.abs(game.selected.y - position.y);
  const check = moves[game.selected.piece.type];

  if (check(game.board, game.color, game.selected, position, { x: dx, y: dy })) {
    const from = { x: game.selected.x, y: game.selected.y }
    movePiece(game.board, from, position);
  }

  resetSelectedPiece();
}

const clickOnPiece = event => {
  const mousePos = getMousePosition(event);
  const position = transformMouseToGridPosition(mousePos);
  console.log(mousePos, position)

  if (isOutsideBoard(position))
    return;

  const square = game.board[position.y][position.x];
  if (game.selected)
    return selectPiece(square, position);

  const piece = square?.piece;
  if (!piece || piece.color !== game.color)
    return;

  const squarePos = { x: square.x, y: square.y };
  const moves = paths[piece.type](game.board, squarePos, game.color, piece.start);

  moves.unshift(squarePos);

  game.selected = square;
  game.moves = moves;

  draw(game, moves);
}

const startGame = data => {
  if (data.color === "black")
    reverseBoard(data.board);

  game.color = data.color;

  createBoard(data.board);
  draw(game);
}

const generateBoard = () => {
  const board = [];
  const pieces = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];

  for (let i = 0; i < 8; i++) {
    board.push({ x: i, y: 7, type: pieces[i], color: "white" })
    board.push({ x: i, y: 6, type: "pawn", start: true, color: "white" })

    board.push({ x: i, y: 0, type: pieces[i], color: "black" })
    board.push({ x: i, y: 1, type: "pawn", start: true, color: "black" })
  }

  startGame({ board, color: "black" });
}

const onLoadImage = () => {
  if (Object.keys(game.images).length === 13)
    generateBoard();
}

const handler = {
  events: new Map(),

  on (eventName, exec) {
    this.events.set(eventName, exec);
  },

  off (eventName) {
    this.events.delete(eventName);
  },

  emit (eventName, data) {
    const exec = events.get(eventName);

    if (exec) {
      exec(data);
    }
  }
}

/*
handler.on("start", startGame);
handler.on("movePiece", movePiece);
handler.on("turn", turn);
handler.on("removePiece", removePiece);
handler.on("addPiece", addPiece);
handler.on("choosePiece", choosePiece);
handler.on("win", winner);
*/

document.querySelector(".canvas-chess")
  .addEventListener("click", clickOnPiece)

loadImages(game.images, onLoadImage);
WSClient();
