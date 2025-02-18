import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { BoardService } from '../../board/board.service';
import { MessageComponent } from '../message.component';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule, MessageComponent],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.css',
})
export class GameOverComponent {
  gameIsOver!: boolean;
  timeOut!: boolean;

  @Output() selectLevel = new EventEmitter();

  constructor(private boardService: BoardService) {
    this.boardService.getGameIsOver().subscribe((isOver) => {
      this.gameIsOver = isOver;
    });
    this.boardService.getGameTimeOut().subscribe((timeOut) => {
      this.timeOut = timeOut;
    });
  }

  restarGame() {
    this.boardService.restartGame();
  }

  onSelectLevel() {
    this.selectLevel.emit(true);
  }
}
