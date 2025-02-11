import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { Board } from './board.interface';
import { CommonModule } from '@angular/common';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SquareComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board!: Board;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.board = this.boardService.getBoard();
    console.log(this.board);
  }

  keys(): Array<number> {
    return Object.keys(this.board.table).map(Number);
  }

  onSelectSquare(square: number): void {
    const currentSquare = this.boardService.getSquare(square);
    if (currentSquare.active) {
      this.deactivateSquare();
      return;
    }

    this.handleSquareSelection(square);
  }

  private deactivateSquare(): void {
    this.boardService.resetActive();
    this.boardService.resetFocus();
  }

  private handleSquareSelection(square: number): void {
    const neighbours = this.boardService.searchNeighbours(square);

    if (this.hasActiveNeighbours(neighbours)) {
      this.trySwapWithActiveSquare(square);
    } else {
      this.activateSquareAndSetFocus(square, neighbours);
    }
  }

  private hasActiveNeighbours(neighbours: number[]): boolean {
    return neighbours.some(neighbour => this.boardService.isActivated(neighbour));
  }

  private trySwapWithActiveSquare(square: number): void {
    const activeSquare = this.boardService.findActive();
    if (activeSquare) {
      this.boardService.swapSquares(activeSquare, square);
      this.deactivateSquare();
      if (this.isAllSquaresExpected()) {
        alert('Congratulations! You solved the puzzle!');
      }
    }
  }

  private activateSquareAndSetFocus(square: number, neighbours: number[]): void {
    this.boardService.setActive(square);
    this.boardService.resetFocus();
    neighbours.forEach(neighbour => this.boardService.setFocus(neighbour));
  }

  private isAllSquaresExpected(): boolean {
    return this.boardService.isAllSquaresWhitValueExpected();
  }
}
