import fs from "node:fs";

function eloZelo(amount: number) {
  const content = "Elo żelo\n".repeat(amount);

  try {
    fs.writeFileSync("./elo-żelo.txt", content);
  } catch (err: unknown) {
    console.error(err);
  }
}

eloZelo(new Date().getMinutes());
