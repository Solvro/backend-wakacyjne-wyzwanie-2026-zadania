const fs = require("node:fs");
function eloZelo(minutes: number): void {
  const elozelo: string = "Elo żelo\n".repeat(minutes);
  try {
    fs.writeFileSync("elo-żelo.txt", elozelo);
  } catch (err) {
    console.error(err);
  }
}
const currentTime = new Date();
const minutes: number = currentTime.getMinutes();
eloZelo(minutes);
