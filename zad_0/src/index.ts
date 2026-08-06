import fs from "node:fs";

function eloZelo(amount: number) {
  const content = Array(amount).fill("Elo żelo").join("\n");
  fs.writeFileSync("elo-żelo.txt", content)
}

const minutes = (new Date).getMinutes();
eloZelo(minutes);
