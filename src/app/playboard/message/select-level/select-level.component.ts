import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardService } from '../../board/board.service';

@Component({
  selector: 'app-select-level',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-level.component.html',
  styleUrl: './select-level.component.css',
})
export class SelectLevelComponent {
  @Input() dimension: number = 3;
  @Output() startGame = new EventEmitter();

  constructor(private boardServices: BoardService) {}

  onSelectLevel() {
    console.log(`${this.dimension}`);
    this.boardServices.setGameBoard(this.dimension);
    this.boardServices.restartGame();
    this.startGame.emit(true);
  }
}
