import { writeFileSync } from "node:fs";

function eloZelo(count: number): void {
  const text = "Elo żelo\n";
  writeFileSync("elo-żelo.txt", text.repeat(count));

  console.log(`Zapisano 'Elo Żelo' ${count} razy do pliku elo-zelo.txt`);
}

const currentMinutes = new Date().getMinutes();
eloZelo(currentMinutes);
