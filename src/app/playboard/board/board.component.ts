import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { Board } from './board.interface';
import { BoardService } from './board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SquareComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  board!: Board;
  gameIsOver = false;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.board = this.boardService.getBoard();
    console.log(this.board);
  }

  keys(): Array<number> {
    return Object.keys(this.board.table).map(Number);
  }

  onSelectSquare(square: number): void {
    const blankNeighbour = this.boardService.searchBlackInNeighbours(square);
    if (blankNeighbour !== null) {
      this.boardService.swapSquares(square, blankNeighbour);
      this.gameIsOver = this.boardService.isAllSquaresWhitValueExpected();
    }
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
    return neighbours.some((neighbour) =>
      this.boardService.isActivated(neighbour)
    );
  }

  private trySwapWithActiveSquare(square: number): void {
    const activeSquare = this.boardService.findActive();
    if (
      activeSquare &&
      (this.board.table[activeSquare].isBlank ||
        this.board.table[square].isBlank)
    ) {
      this.boardService.swapSquares(activeSquare, square);
      this.deactivateSquare();
      if (this.isAllSquaresExpected()) {
        alert('Congratulations! You solved the puzzle!');
      }
    }
  }

  private activateSquareAndSetFocus(
    square: number,
    neighbours: number[]
  ): void {
    this.boardService.setActive(square);
  }

  private isAllSquaresExpected(): boolean {
    return this.boardService.isAllSquaresWhitValueExpected();
  }
}
