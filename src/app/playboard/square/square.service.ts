import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SquareService {
  backgroundImage: string[] = [
    'pz1.jpg',
    'pz2.jpg',
    'pz3.jpg',
    'pz4.jpg',
    'pz5.jpg',
    'pz6.jpg',
    'pz7.jpg',
    'pz8.jpg',
    'pz9.jpg',
  ];

  constructor() {}

  getBackgroundImage(): string {
    const randomIndex = Math.floor(Math.random() * this.backgroundImage.length);
    return this.backgroundImage[randomIndex];
  }
}
