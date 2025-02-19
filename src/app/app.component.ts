import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BoardComponent } from './playboard/board/board.component';
import { BoardService } from './playboard/board/board.service';
import { GameOverComponent } from './playboard/message/game-over/game-over.component';
import { PlayGameComponent } from './playboard/message/play-game/play-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoardComponent, CommonModule, GameOverComponent, PlayGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'puzzle';
  gameStart: boolean = false;
  goToSelectLevel: boolean = false;

  constructor(private boardService: BoardService) {
    this.boardService.getGameIsStart().subscribe((Start) => {
      setTimeout(() => {
        this.gameStart = Start;
      });
    });
  }

  onSelectLevel(status: boolean) {
    this.goToSelectLevel = status;
    this.gameStart = !status;
  }
}
