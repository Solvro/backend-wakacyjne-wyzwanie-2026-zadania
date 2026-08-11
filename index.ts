import * as fs from "fs";

const fileName: string = "elo-zelo.txt";
const currMinutes = new Date().getMinutes();

function eloZelo(count: number, fileName: string) {
  const message = "Elo żelo\n".repeat(count);

  try {
    fs.writeFileSync(fileName, message);
  } catch (err) {
    console.error("Błąd podczas zapisu do pliku elo-zelo:", err);
  }
}

eloZelo(currMinutes, fileName);
