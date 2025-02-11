import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardService } from '../board/board.service';
import { Board } from '../board/board.interface';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './square.component.html',
  styleUrl: './square.component.css'
})
export class SquareComponent implements OnInit{
  @Input({required: true}) square!: number
  @Output() squareSelected = new EventEmitter()
  board: Board = {dimension: 0, table: {}}

  constructor( private boardService: BoardService) {}

  get imagePath() {
    return `assets/images/${this.board.table[this.square].image}`;
  }

  get boxShadow() {
    return this.board.table[this.square].focus ? 'inset red 0px 0px 0px 2px' : 'none';
  }

  get backgroundColor() {
    return this.board.table[this.square].active ? 'purple' : 'lightgrey';
  }

  get backgroundImage() {
    if (this.board.table[this.square].image) {
      return `url(${this.imagePath})`;
    }
    return 'none';
  }

  ngOnInit(){
    this.board = this.boardService.getBoard()
  }

  onSelectSquare(){
    this.squareSelected.emit(this.square)
  }
}
