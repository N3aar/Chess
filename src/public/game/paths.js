import { isEmptySquare, isCapturablePiece, isOutsideBoard } from './utils.js'

const checkMove = (board, color, moves, position) => {
  if (isOutsideBoard(position))
    return false;

  const isEmpty = isEmptySquare(board, position);
  if (!isEmpty && !isCapturablePiece(board, position, color))
    return false;

  if (moves)
    moves.push(position);

  if (isEmpty)
    return true;

  return false;
}

const getOrthogonalMoves = (board, position, color) => {
  const moves = [];

  if (position.x > 0)
    for (let posX = position.x-1; posX > -1; posX--)
      if (!checkMove(board, color, moves, { x: posX, y: position.y }))
        break;

  if (position.x < 8)
    for (let posX = position.x+1; posX < 8 ; posX++)
      if (!checkMove(board, color, moves, { x: posX, y: position.y }))
        break;

  if (position.y > 0)
    for (let posY = position.y-1; posY > -1; posY--)
      if (!checkMove(board, color, moves,{ x: position.x, y: posY }))
        break;

  if (position.y < 8)
    for (let posY = position.y+1; posY < 8; posY++)
      if (!checkMove(board, color, moves, { x: position.x, y: posY }))
        break;

  return moves;
}

const getDiagonalMoves = (board, position, color) => {
  const moves = [];

  if (position.x > 0)
    for (let pos = 1; pos < 7; pos++) {
      const posX = position.x - pos;
      const posY = position.y - pos;
      const nextPos = { x: posX, y: posY };

      if ((posX < 0 || posY < 0) || !checkMove(board, color, moves, nextPos))
        break;
    }

  if (position.x < 8)
    for (let pos = 1; pos < 7; pos++) {
      const posX = position.x + pos;
      const posY = position.y - pos;
      const nextPos = { x: posX, y: posY };

      if ((posX > 7 || posY < 0) || !checkMove(board, color, moves, nextPos))
        break;
    }

  if (position.y > 0)
    for (let pos = 1; pos < 7; pos++) {
      const posX = position.x - pos;
      const posY = position.y + pos;
      const nextPos = { x: posX, y: posY };

      if ((posX < 0 || posY > 7) || !checkMove(board, color, moves, nextPos))
        break;
    }

  if (position.y < 8)
    for (let pos = 1; pos < 7; pos++) {
      const posX = position.x + pos;
      const posY = position.y + pos;
      const nextPos = { x: posX, y: posY };

      if ((posX > 7 || posY > 8) || !checkMove(board, color, moves, nextPos))
        break;
    }

  return moves;
}

const queen = (board, position, color) => getOrthogonalMoves(board, position, color).concat(getDiagonalMoves(board, position, color));

const king = (board, position, color) => {
  const moves = [];

  for (let posY = -1; posY <= 1; posY++) {
    for (let posX = -1; posX <= 1; posX++) {
      const curX = position.x + posX;
      const curY = position.y + posY;
      const nextPos = { x: curX, y: curY };

      if ((isEmptySquare(board, nextPos) || isCapturablePiece(board, nextPos, color)) && !isOutsideBoard(nextPos))
        moves.push(nextPos);
    }
  }

  return moves;
}

const knight = (board, position, color) => {
  const moves = [];

  for (const posX of [position.x-1, position.x+1])
    for (const posY of [position.y-2, position.y+2])
      checkMove(board, color, moves, { x: posX, y: posY });

  for (const posX of [position.x-2, position.x+2])
    for (const posY of [position.y-1, position.y+1])
      checkMove(board, color, moves, { x: posX, y: posY });

  return moves;
}

const pawn = (board, position, color, first) => {
  const moves = [];

  const posOneUp = { x: position.x, y: position.y - 1};
  const posTwoUp = { x: position.x, y: position.y - 2};

  if (!isOutsideBoard(posOneUp) && isEmptySquare(board, posOneUp))
    moves.push(posOneUp);

  if (first && !isOutsideBoard(posTwoUp) && isEmptySquare(board, posTwoUp))
    moves.push(posTwoUp)

  const upY = position.y - 1;
  const leftX = position.x - 1;
  const rightX = position.x + 1;

  const posLeft = { x: leftX, y: upY };
  const posRight = { x: rightX, y: upY };

  if (isCapturablePiece(board, posLeft, color))
    moves.push(posLeft);

  if (isCapturablePiece(board, posRight, color))
    moves.push(posRight);

  return moves;
}

export default {
  king,
  queen,
  knight,
  pawn,
  rook: getOrthogonalMoves,
  bishop: getDiagonalMoves
}
