console.log('Chess!')

// import WSClient from './websocket.js';
// WSClient();

const canvas = document.querySelector(".canvas-chess");
const ctx = canvas.getContext("2d");

const gameContext = {
  board: [],
}

const images = {};
const squareSize = 81;
const gridGap = 2;

class Square {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.piece = null;
  }
}

class Piece {
  constructor (type, color) {
    this.type = type
    this.color = color
  }
}

const createPieces = (color, startY, pawn) => {
  const pieces = ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"]

  for (let i = 0; i < 8; i++) {
    gameContext.board[startY][i].piece = new Piece(pieces[i], color);
    gameContext.board[pawn][i].piece = new Piece("pawn", color);
  }
}

const startBoard = () => {
  for (let file = 0; file < 8; file++) {
    gameContext.board[file] = [];

    for (let rank = 0; rank < 8; rank++) {
      gameContext.board[file][rank] = new Square(rank, file);
    }
  }

  createPieces("black", 0, 1);
  createPieces("white", 7, 6);
}

const draw = () => {
  const board = images.board;

  ctx.drawImage(board, 0, 0, board.width, board.height);

  for (const file in gameContext.board) {
    for (const square of gameContext.board[file]) {
      if (square.piece) {
        const piece = square.piece;
        const imagePiece = images[`${piece.color}${piece.type}`];

        const gapX = square.x > 0 || square.x < 7 ? gridGap : 0;
        const gapY = square.y > 0 || square.y < 7 ? gridGap : 0;

        const centerX = ((square.x * squareSize) + gapX + (squareSize / 2)) - (imagePiece.width / 2);
        const centerY = ((square.y * squareSize) + gapY + (squareSize / 2)) - (imagePiece.width / 2);

        ctx.drawImage(imagePiece, 69 + centerX, 69 + centerY, imagePiece.width, imagePiece.height);
      }
    }
  }
}

const imageLoaded = () => {
  const l = Object.keys(images).length;
  if (l >= 13) {
    draw();
  }
}

const createImage = (imageName, path) => {
  const image = new Image();
  image.src = `./assets/chess/${path || imageName}.png`;
  image.onload = () => {
    images[imageName] = image;
    imageLoaded(imageName);
  }
}

const loadImages = () => {
  const pieces = ["king", "queen", "bishop", "knight", "rook", "pawn"];

  for (const color of ["white", "black"]) {
    for (const piece of pieces) {
      createImage(color + piece, `${color}/${color}-${piece}`);
    }
  }

  createImage("board");
}

(() => {
  loadImages();
  startBoard();
})();
