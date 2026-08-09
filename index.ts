import { writeFileSync } from "node:fs";

function eloZelo(count: number): void {
  const text = "Elo żelo\n".repeat(count);
  writeFileSync("elo-żelo.txt", text, "utf-8");
}

const minutes = new Date().getMinutes();
eloZelo(minutes);

