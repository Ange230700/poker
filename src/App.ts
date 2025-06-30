// src\App.ts

import { TexasHoldem } from "~/src/TexasHoldem";

function main() {
  let winner = 0;
  while (winner === 0) {
    const game = new TexasHoldem();
    winner = game.playRound();
    const result = winner === 0 ? "Tie" : `Player ${winner}`;
    console.log("Winner =", result);
  }
}

main();
