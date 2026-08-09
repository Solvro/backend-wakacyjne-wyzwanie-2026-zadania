import * as fs from "node:fs";

function eloZelo(count: number) {
  const content = "Elo żelo\n".repeat(count);
  try {
    fs.appendFileSync("elo-żelo.txt", content);
  } catch (err) {
    console.error(err);
  }
}

const currentMinutes = new Date().getMinutes();

eloZelo(currentMinutes);
