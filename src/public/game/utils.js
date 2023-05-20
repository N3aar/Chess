import { squareSize } from "./canvas.js";

const margin = 69;

const getSquareByPosition = (board, position) => {
  if (isNaN(position.x) || isNaN(position.y) || isOutsideBoard(position))
    return null;

  return board[position.y][position.x];
};

const isCapturablePiece = (board, position, color) => {
  const piece = getSquareByPosition(board, position)?.piece;

  if (!piece)
    return false;

  return piece.color !== color;
};

const transformMouseToGridPosition = offset => {
  const rank = Math.floor((offset.x - margin) / squareSize);
  const file = Math.floor((offset.y - margin) / squareSize);
  return { x: rank, y: file };
};

const transformGridPositionToDraw = position => ({
  x: (position.x * squareSize) + margin,
  y: (position.y * squareSize) + margin
});

const reflectNumber = (num, min, max) => {
  const difference = num - min;
  return max - difference;
};

const reverseBoard = board => {
  for (const piece of board) {
    piece.x = reflectNumber(piece.x, 0, 7);
    piece.y = reflectNumber(piece.y, 0, 7);
  };
};

/*
const getDirection = (square, toX, toY) => {
  const centerX = square.x;
  const centerY = square.y;

  const vecX = toX - centerX;
  const vecY = toY - centerY;

  const angle_rad = Math.atan2(vecX, vecY);
  const angle_deg = angle_rad * (180 / Math.PI);

  return Math.round(angle_deg / 45) % 8;
}
*/

const getDistance = (positionOne, positionTwo) => Math.floor(Math.hypot(positionOne.x - positionTwo.x, positionOne.y - positionTwo.y));
const equalsPosition = (positionOne, positionTwo) => positionOne.x === positionTwo.x && positionOne.y === positionTwo.y;

const isOutsideBoard = position => (position.x < 0 || position.x > 7 || position.y < 0 || position.y > 7);
const isEmptySquare = (board, position) => !getSquareByPosition(board, position)?.piece;

export {
  getSquareByPosition,
  getDistance,
  isEmptySquare,
  isCapturablePiece,
  isOutsideBoard,
  transformMouseToGridPosition,
  transformGridPositionToDraw,
  equalsPosition,
  reflectNumber,
  reverseBoard
}
