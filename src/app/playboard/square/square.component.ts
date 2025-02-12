import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board, Square } from '../board/board.interface';
import { BoardService } from '../board/board.service';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './square.component.html',
  styleUrl: './square.component.css',
})
export class SquareComponent implements OnInit {
  @Input({ required: true }) square!: number;
  @Input({ required: true }) squareContent!: Square;
  @Input({ required: true }) gameIsOver!: boolean;

  @Output() squareSelected = new EventEmitter();
  board: Board = {
    dimension: 0,
    image: 'airplane.jpg',
    blankImage: 'image.png',
    table: {},
  };

  constructor(private boardService: BoardService) {}

  get imagePath() {
    if (this.squareContent.isBlank && !this.gameIsOver)
      return `assets/images/${this.board.blankImage}`;
    else return `assets/images/${this.board.image}`;
  }

  get backgroundColor() {
    return this.board.table[this.square].active ? 'purple' : 'lightgrey';
  }

  get backgroundImage() {
    if (this.board.image && this.board.blankImage) {
      return `url(${this.imagePath})`;
    }
    return 'none';
  }

  get backgroundPosition() {
    return this.board.table[this.square].positionImage;
  }

  ngOnInit() {
    this.board = this.boardService.getBoard();
  }

  onSelectSquare() {
    this.squareSelected.emit(this.square);
  }
}
