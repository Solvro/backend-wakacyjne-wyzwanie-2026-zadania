import fs from "node:fs";

function eloZelo(amount: number) {
  const value = "Elo żelo";
  const file = "elo-żelo.txt";
  const content = Array(amount).fill(value).join("\n");
  fs.writeFileSync(file, content)
}

const minutes = (new Date).getMinutes();
eloZelo(minutes);
