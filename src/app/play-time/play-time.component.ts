import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription, takeWhile } from 'rxjs';
import { BoardService } from '../playboard/board/board.service';

@Component({
  selector: 'app-play-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-time.component.html',
  styleUrls: ['./play-time.component.css'],
})
export class PlayTimeComponent implements OnDestroy {
  countdown: number = 90;
  private subscription!: Subscription;

  constructor(private boardService: BoardService) {
    this.startCountdown();
  }

  startCountdown() {
    this.subscription = interval(1000)
      .pipe(takeWhile(() => this.countdown > 0))
      .subscribe({
        next: () => {
          this.countdown--;
          if (this.countdown === 0) {
            this.subscription.unsubscribe();
            this.boardService.setGameIsOver(true);
            this.boardService.setGameTimeOut(true);
          }
        },
        error: (err) => console.error('Error en el temporizador:', err),
        complete: () => console.log('Proceso de cuenta regresiva completado'),
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
