// src\Deck.ts

import { Card } from "~/src/Card";

export class Deck {
  private cards: Card[];

  constructor() {
    this.cards = [];
    const suits = ["Spade", "Heart", "Diamond", "Club"];
    const ranks = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(rank, suit));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal(number: number): Card[] {
    return this.cards.splice(0, number);
  }

  burn(number: number): void {
    this.cards.splice(0, number);
  }

  getCards(): Card[] {
    return [...this.cards];
  }
}
