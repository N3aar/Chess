import { transformGridPositionToDraw } from "./utils.js";

const canvas = document.querySelector(".canvas-chess");
const ctx = canvas.getContext("2d");
const squareSize = 83;

const getMousePosition = event => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}

const drawBoard = (images, board) => {
  for (const file in board) {
    for (const square of board[file]) {
      const piece = square.piece;
      if (piece) {
        const imagePiece = images[`${piece.color}${piece.type}`];
        const position = transformGridPositionToDraw({ x: square.x, y: square.y });
        ctx.drawImage(imagePiece, position.x, position.y, imagePiece.width, imagePiece.height);
      }
    }
  }
}

const drawMoves = moves => {
  ctx.fillStyle = "rgba(46, 204, 113, .4)";

  for (const square of moves) {
    const position = transformGridPositionToDraw({ x: square.x, y: square.y });
    ctx.fillRect(position.x, position.y, squareSize, squareSize);
  }
}

const clearBoard = (images, color) => {
  const isBlack = color === "black";

  if (isBlack) {
    ctx.save();
    ctx.scale(1, -1);
  }

  const board = images.board;
  ctx.drawImage(board, 0, 0, board.width, board.height * (isBlack ? -1 : 1));

  if (isBlack)
    ctx.restore();
}

const draw = (game, moves) => {
  clearBoard(game.images, game.color);

  if (moves)
    drawMoves(moves)

  drawBoard(game.images, game.board);
}

const createImage = (images, imageName, path, onLoad) => {
  const image = new Image();
  image.src = `public/assets/chess/${path || imageName}.png`;
  image.onload = () => {
    images[imageName] = image;
    onLoad();
  };
}

const loadImages = (images, onLoad) => {
  for (const color of ["white", "black"])
    for (const name of ["king", "queen", "bishop", "knight", "rook", "pawn"])
      createImage(images, color + name, `${color}/${color}-${name}`, onLoad);

  createImage(images, "board", null, onLoad);
}

export {
  draw,
  clearBoard,
  loadImages,
  getMousePosition,
  squareSize
}
