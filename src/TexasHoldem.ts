// src\TexasHoldem.ts

import { Card } from "~/src/Card";
import { Deck } from "~/src/Deck";

export class TexasHoldem {
  private readonly deck: Deck;

  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();
  }

  dealToPlayer(cardsCount: number): Card[] {
    return this.deck.deal(cardsCount);
  }

  dealCommunityCards(): Card[] {
    this.deck.burn(1);
    const communityCards = this.deck.deal(3); // flop
    this.deck.burn(1);
    communityCards.push(...this.deck.deal(1)); // turn
    this.deck.burn(1);
    communityCards.push(...this.deck.deal(1)); // river
    return communityCards;
  }

  private static getCardValue(rank: string): number {
    switch (rank) {
      case "1":
        return 14; // Ace high
      case "K":
        return 13;
      case "Q":
        return 12;
      case "J":
        return 11;
      default:
        return parseInt(rank, 10);
    }
  }

  private evaluateHand(holeCards: Card[], communityCards: Card[]): number[] {
    const values: number[] = [];
    const allCards = [...holeCards, ...communityCards];
    for (const card of allCards) {
      values.push(TexasHoldem.getCardValue(card.rank));
    }
    values.sort((a, b) => b - a); // descending
    return values;
  }

  private compareHands(hand1: number[], hand2: number[]): number {
    for (let i = 0; i < Math.min(hand1.length, hand2.length); i++) {
      if (hand1[i] > hand2[i]) return 1;
      else if (hand1[i] < hand2[i]) return -1;
    }
    return 0;
  }

  public playRound(): number {
    const player1Hand = this.dealToPlayer(2);
    const player2Hand = this.dealToPlayer(2);
    const communityCards = this.dealCommunityCards();

    const eval1 = this.evaluateHand(player1Hand, communityCards);
    const eval2 = this.evaluateHand(player2Hand, communityCards);

    const player1BestHand = TexasHoldem.showdown(player1Hand, communityCards);
    const player2BestHand = TexasHoldem.showdown(player2Hand, communityCards);

    // Logging (Node.js)
    console.log(
      "Player 1 Hand:",
      player1Hand.map((c) => c.toString()).join(" "),
    );
    console.log(
      "Player 2 Hand:",
      player2Hand.map((c) => c.toString()).join(" "),
    );
    console.log(
      "Community Cards:",
      communityCards.map((c) => c.toString()).join(" "),
    );
    console.log("Player 1 Evaluation:", eval1);
    console.log("Player 2 Evaluation:", eval2);
    console.log("Player 1 Best Hand:", player1BestHand);
    console.log("Player 2 Best Hand:", player2BestHand);

    const comparison = this.compareHands(eval1, eval2);
    if (comparison > 0) return 1;
    else if (comparison < 0) return 2;
    else return 0;
  }

  public static showdown(holeCards: Card[], communityCards: Card[]): string {
    const all = [...holeCards, ...communityCards];
    const rankCounts = TexasHoldem.getRankCounts(all);
    const suitCounts = TexasHoldem.getSuitCounts(all);
    const valueSet = new Set<number>(
      all.map((card) => TexasHoldem.getCardValue(card.rank)),
    );
    const counts = Array.from(rankCounts.values());

    if (TexasHoldem.hasFourOfAKind(counts)) return "Four of a Kind";
    if (TexasHoldem.hasFullHouse(counts)) return "Full House";
    if (TexasHoldem.hasFlush(suitCounts)) return "Flush";
    if (TexasHoldem.hasStraight(valueSet)) return "Straight";
    if (TexasHoldem.hasThreeOfAKind(counts)) return "Three of a Kind";
    if (TexasHoldem.hasTwoPairs(counts)) return "Two Pairs";
    if (TexasHoldem.hasPair(counts)) return "One Pair";
    return "High Card: " + (valueSet.size ? Math.max(...valueSet) : 0);
  }

  // --- Helper methods for showdown ---

  private static getRankCounts(cards: Card[]): Map<string, number> {
    const rankCounts = new Map<string, number>();
    for (const card of cards) {
      rankCounts.set(card.rank, (rankCounts.get(card.rank) ?? 0) + 1);
    }
    return rankCounts;
  }

  private static getSuitCounts(cards: Card[]): Map<string, number> {
    const suitCounts = new Map<string, number>();
    for (const card of cards) {
      suitCounts.set(card.suit, (suitCounts.get(card.suit) ?? 0) + 1);
    }
    return suitCounts;
  }

  private static hasFourOfAKind(counts: number[]): boolean {
    return counts.includes(4);
  }

  private static hasFullHouse(counts: number[]): boolean {
    return counts.includes(3) && counts.filter((c) => c === 2).length >= 1;
  }

  private static hasFlush(suitCounts: Map<string, number>): boolean {
    return Array.from(suitCounts.values()).some((c) => c >= 5);
  }

  private static hasStraight(valueSet: Set<number>): boolean {
    const vals = Array.from(valueSet).sort((a, b) => a - b);
    let consecutive = 1;
    for (let i = 0; i < vals.length - 1; i++) {
      if (vals[i + 1] === vals[i] + 1) {
        consecutive++;
        if (consecutive >= 5) return true;
      } else {
        consecutive = 1;
      }
    }
    return false;
  }

  private static hasThreeOfAKind(counts: number[]): boolean {
    return counts.includes(3);
  }

  private static hasTwoPairs(counts: number[]): boolean {
    return counts.filter((c) => c === 2).length >= 2;
  }

  private static hasPair(counts: number[]): boolean {
    return counts.filter((c) => c === 2).length === 1;
  }
}
