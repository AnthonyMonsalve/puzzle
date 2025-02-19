import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayTimeComponent } from '../../play-time/play-time.component';
import { SquareComponent } from '../square/square.component';
import { SquareService } from '../square/square.service';
import { Board } from './board.interface';
import { BoardService } from './board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SquareComponent, PlayTimeComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  board!: Board;
  gameIsOver!: boolean;
  timeOut!: boolean;
  bgImage!: string;
  timePlay!: number;
  @Output() gameStatus = new EventEmitter();

  constructor(
    private boardService: BoardService,
    private squareService: SquareService
  ) {}

  ngOnInit(): void {
    this.board = this.boardService.getBoard();
    this.boardService.getGameIsOver().subscribe((isOver) => {
      this.gameIsOver = isOver;
    });

    this.bgImage = this.squareService.getBackgroundImage();
  }

  keys(): Array<number> {
    return Object.keys(this.board.table).map(Number);
  }

  onSelectSquare(square: number): void {
    const blankNeighbour = this.boardService.searchBlackInNeighbours(square);
    if (blankNeighbour !== null) {
      this.boardService.swapSquares(square, blankNeighbour);
      this.gameIsOver = this.boardService.isAllSquaresWhitValueExpected();
      this.boardService.setGameIsOver(this.gameIsOver);
      this.gameStatus.emit(this.gameIsOver);
    }
  }

  onEndGame() {
    this.boardService.finishGame();
  }
}
