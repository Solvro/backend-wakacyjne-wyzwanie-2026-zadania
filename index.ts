import * as fs from "fs";

const fileName: string = "elo-zelo.txt";
const currMinutes = new Date().getMinutes();

function eloZelo(count: number, fileName: string) {
  const message = "Elo żelo\n".repeat(count);
  fs.writeFileSync(fileName, message);
}

eloZelo(currMinutes, fileName);
