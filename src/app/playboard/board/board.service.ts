import { Injectable } from '@angular/core';
import { board5 } from '../games/board';
import { board2 } from '../games/board-2';
import { board3 } from '../games/board-3';
import { board4 } from '../games/board-4';
import { Board, Square } from './board.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  boards: Array<Board> = [board2, board3, board4, board5];
  board: Board = this.boards[2];

  constructor() {}

  nextBoard(): void {
    const index = this.boards.indexOf(this.board);
    if (index < this.boards.length - 1) {
      this.board = this.boards[index + 1];
    } else {
      this.board = this.boards[0];
    }

    this.resetActive();
    this.resetFocus();
  }

  getBoard(): Board {
    return this.board;
  }

  getSquare(square: number): Square {
    return this.board.table[square];
  }

  searchNeighbours(square: number): Array<number> {
    const neighbours: Array<number> = [];
    const dimension = this.board.dimension;
    const row = Math.floor(square / dimension);
    const col = square % dimension;
    if (row > 0) {
      neighbours.push(square - dimension);
    }
    if (col > 0) {
      neighbours.push(square - 1);
    }
    if (row < dimension - 1) {
      neighbours.push(square + dimension);
    }
    if (col < dimension - 1) {
      neighbours.push(square + 1);
    }
    return neighbours;
  }

  searchBlackInNeighbours(square: number): number | null {
    const neighbours = this.searchNeighbours(square);
    for (const neighbour of neighbours) {
      if (this.board.table[neighbour].isBlank) {
        return neighbour;
      }
    }
    return null;
  }

  resetActive(): void {
    for (const square in this.board.table) {
      this.board.table[square].active = false;
    }
  }

  resetFocus(): void {
    for (const square in this.board.table) {
      this.board.table[square].focus = false;
    }
  }

  isActivated(square: number): boolean {
    return this.board.table[square].active;
  }

  findActive(): number | null {
    for (const square in this.board.table) {
      if (this.board.table[square].active) {
        return parseInt(square); // Convierte la clave string a un número, si es necesario.
      }
    }
    return null; // Devuelve null si no se encuentra ningún objeto activo.
  }

  swapSquares(square1: number, square2: number): void {
    const temp = this.board.table[square1];
    this.board.table[square1] = this.board.table[square2];
    this.board.table[square2] = temp;

    console.log(this.board.table);
  }

  setActive(square: number): void {
    this.resetActive();
    this.board.table[square].active = true;
  }

  setFocus(square: number): void {
    this.board.table[square].focus = true;
  }

  isAllSquaresWhitValueExpected(): boolean {
    for (const square in this.board.table) {
      if (square !== this.board.table[square].valueExpected.toLocaleString()) {
        return false;
      }
    }
    return true;
  }
}
