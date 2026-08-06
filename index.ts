import fs from "node:fs";

function eloZelo(n: number): void {
  let content = "";
  for (let i = 0; i < n; i++) {
    content += "Elo żelo\n";
  }

  try {
    fs.writeFileSync("elo-żelo.txt", content);
  } catch (error) {
    console.error(error);
  }
}

const currentMinutes = new Date().getMinutes();
eloZelo(currentMinutes);
