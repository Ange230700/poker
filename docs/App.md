<!-- docs\App.md -->

# **Algorithmic Description of `main.ts`**

The main application (`main.ts`) implements a Texas Hold'em poker simulator between two players, continuing rounds until a decisive winner is found. The key steps are:

1. **Initialize Game Loop:**  
   Start with `winner = 0` to indicate no winner yet.

2. **Repeat Rounds Until Decisive Result:**  
   - For each round, create a new instance of the Texas Holdem game.
   - Deal two hole cards to each player and five community cards.
   - Evaluate each player's best possible hand using their hole cards and the community cards.
   - Compare the hands lexicographically (high cards first) to determine the stronger hand.

3. **Logging:**  
   - Print each player's hand, the community cards, and the hand evaluations for debugging and clarity.
   - Announce the winner of the round as either "Player 1", "Player 2", or "Tie".

4. **Loop Exit:**  
   - If there is a tie, repeat another round.
   - If there is a winner, print and exit.

**Example flow:**
- "Player 1 Hand: K-Spade 10-Heart"
- "Player 2 Hand: 9-Club 2-Diamond"
- "Community Cards: 5-Heart 3-Spade J-Diamond 4-Club 7-Heart"
- "Player 1 Best Hand: One Pair"
- "Player 2 Best Hand: High Card: 9"
- "Winner = Player 1"

This algorithm ensures fairness and clarity by simulating each round from a newly shuffled deck, following the rules of Texas Hold'em, and providing transparent hand comparison and round outcome.
