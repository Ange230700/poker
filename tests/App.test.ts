// tests\App.test.ts

import { describe, it, expect } from "vitest";
import { TexasHoldem } from "~/src/TexasHoldem";
import { Card } from "~/src/Card";
import { Deck } from "~/src/Deck";

describe("Card", () => {
  it("should stringify rank and suit", () => {
    const card = new Card("K", "Spade");
    expect(card.toString()).toBe("K-Spade");
  });
});

describe("Deck", () => {
  it("should initialize with 52 cards", () => {
    const deck = new Deck();
    expect(deck.getCards().length).toBe(52);
  });

  it("should deal and burn cards correctly", () => {
    const deck = new Deck();
    deck.shuffle();
    const dealt = deck.deal(5);
    expect(dealt.length).toBe(5);
    expect(deck.getCards().length).toBe(47);

    deck.burn(2);
    expect(deck.getCards().length).toBe(45);
  });
});

describe("TexasHoldem", () => {
  it("should play a round and return a winner (1, 2) or tie (0)", () => {
    const game = new TexasHoldem();
    const result = game.playRound();
    expect([0, 1, 2]).toContain(result);
  });

  it("should evaluate High Card correctly", () => {
    // 2-Heart, 5-Spade, 7-Club, 8-Diamond, J-Spade, Q-Club, 3-Diamond
    const playerCards = [new Card("2", "Heart"), new Card("5", "Spade")];
    const communityCards = [
      new Card("7", "Club"),
      new Card("8", "Diamond"),
      new Card("J", "Spade"),
      new Card("Q", "Club"),
      new Card("3", "Diamond"),
    ];
    const result = TexasHoldem.showdown(playerCards, communityCards);
    expect(result).toMatch(/^High Card: \d+$/);
  });

  it("should detect One Pair", () => {
    // Pair of Q
    const playerCards = [new Card("Q", "Heart"), new Card("3", "Spade")];
    const communityCards = [
      new Card("7", "Club"),
      new Card("8", "Diamond"),
      new Card("J", "Spade"),
      new Card("Q", "Club"),
      new Card("4", "Diamond"),
    ];
    const result = TexasHoldem.showdown(playerCards, communityCards);
    expect(result).toBe("One Pair");
  });

  it("should detect Two Pairs", () => {
    // Two pairs: Q and 8
    const playerCards = [new Card("Q", "Heart"), new Card("8", "Spade")];
    const communityCards = [
      new Card("7", "Club"),
      new Card("8", "Diamond"),
      new Card("J", "Spade"),
      new Card("Q", "Club"),
      new Card("4", "Diamond"),
    ];
    const result = TexasHoldem.showdown(playerCards, communityCards);
    expect(result).toBe("Two Pairs");
  });

  it("should detect Three of a Kind", () => {
    // Three of a kind: J
    const playerCards = [new Card("J", "Heart"), new Card("J", "Spade")];
    const communityCards = [
      new Card("7", "Club"),
      new Card("J", "Diamond"),
      new Card("8", "Spade"),
      new Card("Q", "Club"),
      new Card("4", "Diamond"),
    ];
    const result = TexasHoldem.showdown(playerCards, communityCards);
    expect(result).toBe("Three of a Kind");
  });

  it("should detect Straight", () => {
    // Straight: 6-7-8-9-10
    const playerCards = [new Card("6", "Spade"), new Card("7", "Diamond")];
    const communityCards = [
      new Card("8", "Heart"),
      new Card("9", "Club"),
      new Card("10", "Spade"),
      new Card("Q", "Club"),
      new Card("4", "Diamond"),
    ];
    const result = TexasHoldem.showdown(playerCards, communityCards);
    expect(result).toBe("Straight");
  });

  it("should detect Flush", () => {
    // Five Clubs (Flush)
    const playerCards = [new Card("2", "Club"), new Card("4", "Club")];
    const communityCards = [
      new Card("7", "Club"),
      new Card("8", "Club"),
      new Card("J", "Club"),
      new Card("Q", "Club"),
      new Card("4", "Diamond"),
    ];
    const result = TexasHoldem.showdown(playerCards, communityCards);
    expect(result).toBe("Flush");
  });

  it("should detect Full House", () => {
    // Three 4s, two Js
    const playerCards = [new Card("4", "Heart"), new Card("J", "Spade")];
    const communityCards = [
      new Card("4", "Club"),
      new Card("J", "Diamond"),
      new Card("4", "Diamond"),
      new Card("8", "Spade"),
      new Card("Q", "Club"),
    ];
    const result = TexasHoldem.showdown(playerCards, communityCards);
    expect(result).toBe("Full House");
  });

  it("should detect Four of a Kind", () => {
    // Four Qs
    const playerCards = [new Card("Q", "Heart"), new Card("Q", "Spade")];
    const communityCards = [
      new Card("Q", "Club"),
      new Card("Q", "Diamond"),
      new Card("8", "Spade"),
      new Card("J", "Diamond"),
      new Card("4", "Diamond"),
    ];
    const result = TexasHoldem.showdown(playerCards, communityCards);
    expect(result).toBe("Four of a Kind");
  });
});
