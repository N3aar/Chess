console.log('Chess!')

import WSClient from './websocket.js';

const canvas = document.querySelector(".canvas-chess");
const ctx = canvas.getContext("2d");

WSClient();

const gameContext = {
  board: new Array(8).fill([]),
}

const images = {};
const squareSize = 81;
const gridGap = 1;

const draw = () => {
  const board = images.board;
  ctx.drawImage(board, 0, 0, board.width, board.height);

  for (const square of board) {
    if (square.piece) {
      const imagePiece = images[square.piece.name];
      const centerX = ((square.x * squareSize) + (squareSize / 2)) - (imagePiece.width / 2);
      const centerY = ((square.y * squareSize) + (squareSize / 2)) - (imagePiece.width / 2);
  
      ctx.drawImage(imagePiece, centerX, centerY, imagePiece.width, imagePiece.height);
    }
  }
}

const createImage = (imageName) => {
  const image = new Image();
  image.src = `./assets/chess/${imageName}.png`;
  return image;
}

const loadImages = () => {
  const pieces = ["king", "queen", "knight", "pawn", "rook"];
  const imgs = [];

  for (const color of ["white", "black"]) {
    for (const piece in pieces) {
      images[piece] = new createImage(`${color}/${color}-${piece}`);
    }
  }

  images.board = createImage("board");
}