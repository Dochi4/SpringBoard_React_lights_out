import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    let count = 0;

    function rand() {
      let ticks = Math.floor(Math.random() * 2);
      if (ticks === 1) {
        // Use === for comparison, not = (assignment)
        count++;
        return true;
      } else {
        return false;
      }
    }

    function chance(n) {
      if (count < n) {
        return rand();
      } else {
        return false;
      }
    }
    for (let i = 0; i < nrows; i++) {
      initialBoard[i] = [];
      for (let j = 0; j < ncols; j++) {
        initialBoard[i][j] = chance(chanceLightStartsOn);
      }
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    const boardCheck = board.flat();
    // Check if every value is true
    return boardCheck.every((cell) => cell === true);
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on the board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const clonedBoard = oldBoard.map((row) => [...row]);

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, clonedBoard);
      flipCell(y - 1, x, clonedBoard);
      flipCell(y + 1, x, clonedBoard);
      flipCell(y, x - 1, clonedBoard);
      flipCell(y, x + 1, clonedBoard);

      // TODO: return the copy

      return clonedBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
  return (
    <div>
      {hasWon() ? (
        <p>You WON!</p>
      ) : (
        <table>
          <tbody>
            {board.map((nrow, y) => (
              <tr key={y}>
                {nrow.map((cellIsLit, x) => (
                  <Cell
                    key={`${y}-${x}`}
                    isLit={cellIsLit}
                    flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Board;
