const fs = require('node:fs');

const greet = "Elo żelo\n";

function eloZelo(num: number): void {
  let text = "";

  for (let i = 0; i < num; i++) {
    text += greet;
  }


  try {
    fs.writeFileSync("elo-żelo.txt", text, "utf-8");
  } catch (err) {
    console.error(err);
  }
}

const nowMinutes = new Date().getMinutes();
eloZelo(nowMinutes);