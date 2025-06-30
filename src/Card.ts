// src\Card.ts

export class Card {
  constructor(
    public readonly rank: string,
    public readonly suit: string,
  ) {}

  toString() {
    return `${this.rank}-${this.suit}`;
  }
}
