import fs from "node:fs";

const baseText: string = "Elo żelo\n";

function eloZelo(repeats: number): void {
  const content: string = baseText.repeat(repeats);
  try {
    fs.writeFileSync("elo-żelo.txt", content);
  } catch (err) {
    console.error(err);
  }
}

const minutes: number = new Date().getMinutes();
eloZelo(minutes);
