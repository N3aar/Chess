import WSClient from '../websocket.js';
WSClient();

const canvas = document.querySelector(".canvas-chess");
const ctx = canvas.getContext("2d");

const game = {
  color: "",
  board: []
}

const images = {};
const squareSize = 83;
const margin = 69;

const createSquare = (x, y) => ({ x, y, piece: null })
const createPiece = (type, color) => ({ type, color })

const createBoard = pieces => {
  game.board.length = 0;

  for (let file = 0; file < 8; file++) {
    game.board[file] = [];

    for (let rank = 0; rank < 8; rank++) {
      game.board[file][rank] = createSquare(rank, file);
    }
  }

  for (const square of pieces) {
    game.board[square.y][square.x].piece = createPiece(square.type, square.color);
  }
}

const clearBoard = () => {
  const board = images[`${game.color}board`];
  ctx.drawImage(board, 0, 0, board.width, board.height);
}

const getSquarePosInBoard = (x, y) => {
  const centerX = (x * squareSize) + margin;
  const centerY = (y * squareSize) + margin;
  return { x: centerX, y: centerY }
}

const drawBoard = () => {
  for (const file in game.board) {
    for (const square of game.board[file]) {
      const piece = square.piece;
      if (piece) {
        const imagePiece = images[`${piece.color}${piece.type}`];
        const position = getSquarePosInBoard(square.x, square.y);
        ctx.drawImage(imagePiece, position.x, position.y, imagePiece.width, imagePiece.height);
      }
    }
  }
}

const drawMoves = moves => {
  ctx.fillStyle = "rgba(46, 204, 113, .4)";

  for (const square of moves) {
    const position = getSquarePosInBoard(square.x, square.y);
    ctx.fillRect(position.x, position.y, squareSize, squareSize);
  }
}

const draw = () => {
  clearBoard();
  drawBoard();
}

const reflectNumber = (num, min, max) => {
  const difference = num - min;
  const reflectedNumber = max - difference;
  return reflectedNumber;
}

const reverseBoard = board => {
  for (const piece of board) {
    piece.x = reflectNumber(piece.x, 0, 7);
    piece.y = reflectNumber(piece.y, 0, 7);
  }
}

const startGame = data => {
  if (data.color === "black")
    reverseBoard(data.board);

  game.color = data.color;

  createBoard(data.board);
  draw();
}

const getMousePosition = event => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return { x, y };
}

const getSquareByPosition = (x, y) => {
  const rank = Math.floor(x / squareSize) - 1;
  const file = Math.floor(y / squareSize) - 1;
  return { x: rank, y: file };
}

const selectPiece = event => {
  const mousePos = getMousePosition(event);
  const position = getSquareByPosition(mousePos.x, mousePos.y);
  const square = game.board[position.y][position.x];
}

const imageLoaded = () => {
  const a = Object.keys(images).length;
  if (a === 14) {
    generateBoard();
  }
}

const createImage = (imageName, path) => {
  const image = new Image();

  image.src = `public/assets/chess/${path || imageName}.png`;
  image.onload = () => {
    images[imageName] = image;
    imageLoaded(imageName);
  }
}

const loadImages = () => {
  for (const color of ["white", "black"]) {
    for (const name of ["board", "king", "queen", "bishop", "knight", "rook", "pawn"]) {
      createImage(color + name, `${color}/${color}-${name}`);
    }
  }
}

const generateBoard = () => {
  const board = [];
  const pieces = ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"];

  for (let i = 0; i < 8; i++) {
    board.push({ x: i, y: 7, type: pieces[i], color: "white" })
    board.push({ x: i, y: 6, type: "pawn", color: "white" })

    board.push({ x: i, y: 0, type: pieces[i], color: "black" })
    board.push({ x: i, y: 1, type: "pawn", color: "black" })
  }

  board[0].y = 4;
  board[5].x = 2;
  board[5].y = 3;

  startGame({ board, color: "black" });
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

handler.on("start", startGame);
handler.on("removePiece", removePiece);
handler.on("addPiece", addPiece);
handler.on("win", winner);
handler.on("quit", quited);

loadImages();

canvas.addEventListener("click", selectPiece)
