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

  @Output() squareSelected = new EventEmitter();

  board!: Board;
  gameIsOver!: boolean;
  backgroundSize: string = '600px'

  constructor(private boardService: BoardService) {
    this.boardService.getGameIsOver().subscribe((isOver) => {
      this.gameIsOver = isOver;
    });

    this.backgroundSize = this.sizeBackground()
    window.addEventListener('resize', () => {
      this.backgroundSize = this.sizeBackground()
    });
  }

  sizeBackground() {
    if(window.innerWidth > 700){
      return '600px'
    }else if(window.innerWidth <= 700 && window.innerWidth > 550){
      return '500px'
    }else if(window.innerWidth <= 550 && window.innerWidth > 450){
      return '400px'
    }else if(window.innerWidth <= 450){
      return '300px'
    }
    return '600px'
  }

  ngOnInit() {
    this.board = this.boardService.getBoard();
  }

  get imagePath() {
    if (this.squareContent.isBlank && !this.gameIsOver)
      return `assets/images/${this.board.blankImage}`;
    else return `assets/images/${this.board.image}`;
  }

  get backgroundColor() {
    return this.board.table[this.square].active ? 'purple' : 'lightgrey';
  }

  get backgroundImage() {
    return `url(${this.imagePath})`;
  }

  get backgroundPosition() {
    return this.board.table[this.square].positionImage;
  }

  onSelectSquare() {
    this.squareSelected.emit(this.square);
  }
}
