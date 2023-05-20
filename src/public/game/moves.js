import { getDistance, isEmptySquare, isCapturablePiece, isOutsideBoard } from "./utils.js";

const checkInline = (board, square, to) => {
  const stepX = Math.sign(to.x - square.x);
  const stepY = Math.sign(to.y - square.y);

  let currentX = square.x + stepX;
  let currentY = square.y + stepY;

  while (currentX !== to.x || currentY !== to.y) {
    const position = { x: currentX, y: currentY }

    if (isOutsideBoard(position) || !isEmptySquare(board, position))
      return false;

    currentX += stepX;
    currentY += stepY;
  }

  return true;
}

const king = (board, color, square, position) => getDistance(square.x, square.y, position) <= 1 && (isEmptySquare(board, position) || isCapturablePiece(board, position, color));

const knight = (board, color, square, position, diff) => {
  if ((diff.x !== 1 || diff.y !== 2) && (diff.x !== 2 || diff.y !== 1))
    return false;

  return isEmptySquare(board, position) || isCapturablePiece(board, position, color)
}

const pawn = (board, color, square, position) => {
  const dx = position.x - square.x;
  const dy = position.y - square.y;

  if (dx === 0) {
    if (dy === -1)
      return isEmptySquare(board, position);

    if (square.piece.start && dy === -2)
      return isEmptySquare(board, position) && isEmptySquare(board, { x: square.x, y: square.y - 1 });
  }

  if (Math.abs(dx) === 1 && dy === -1)
    return isCapturablePiece(board, position, color);

  return false;
}

const queen = (board, color, square, position, diff) => {
  if (diff.x !== diff.y && diff.x !== 0 && diff.y !== 0)
    return false;

  if (!checkInline(board, square, position))
    return false;

  return isEmptySquare(board, position) || isCapturablePiece(board, position, color);
}

const rook = (board, color, square, position, diff) => {
  if (diff.x !== 0 && diff.y !== 0)
    return false;

  if (!checkInline(board, square, position))
    return false;

  return isEmptySquare(board, position) || isCapturablePiece(board, position, color);
}

const bishop = (board, color, square, position, diff) => {
  if (isOutsideBoard(position) || diff.x !== diff.y)
    return false;

  if (!checkInline(board, square, position))
    return false;

  return isEmptySquare(board, position) || isCapturablePiece(board, position, color);
}

export default {
  king,
  queen,
  bishop,
  knight,
  rook,
  pawn
}
