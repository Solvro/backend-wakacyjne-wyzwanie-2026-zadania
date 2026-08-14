import * as fs from "fs";

// ex.1
function eloZelo(count: number): void {
  let content = "";
  for (let i = 0; i < count; i++) {
    content += "Elo żelo\n";
  }
  try {
    fs.writeFileSync("elo-żelo.txt", content);
  } catch (error) {
    console.error("Nie udało się zapisać pliku elo-żelo.txt:", error);
  }
}

// ex.2
const minutes = new Date().getMinutes();
eloZelo(minutes);
console.log(`Wpisano "Elo żelo" ${minutes} razy do pliku elo-żelo.txt`);