import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MessageComponent } from '../message.component';
import { SelectLevelComponent } from '../select-level/select-level.component';

@Component({
  selector: 'app-play-game',
  standalone: true,
  imports: [CommonModule, MessageComponent, SelectLevelComponent],
  templateUrl: './play-game.component.html',
  styleUrl: './play-game.component.css',
})
export class PlayGameComponent {
  @Input() selectingLevel = false;
  @Input() gameStart: boolean = false;
  selectedLevel!: number;

  onSelectLevel(event: any) {
    this.selectingLevel = true;
    if (event.target.id != 'select-level-initial') this.gameStart = true;
    console.log('Selecting level');
  }

  onStartGame(status: boolean) {
    this.gameStart = status;
    console.log('Starting game', status);
  }
}
