const fs = require('node:fs');

function eloZelo(number: number): void {
  let text = "";

  for (let i = 0; i < number; i++){
    text = text + "Elo żelo\n";
  }


  try {
    fs.writeFileSync("elo-żelo.txt", text, "utf-8");
  } catch (err) {
  console.error(err);
}
}

const nowMinutes = new Date().getMinutes();
eloZelo(nowMinutes);