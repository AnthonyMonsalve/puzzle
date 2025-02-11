import { Injectable } from '@angular/core';
import { board } from '../../board';
import { Board, Square } from './board.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  board: Board = board;

  constructor() { }

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
  }

  setActive(square: number): void {
    this.resetActive();
    this.board.table[square].active = true;
  }

  setFocus(square: number): void {
    this.board.table[square].focus = true;
  }
}
