import * as fs from "node:fs";

function eloZelo(n: number): void {
  let content = "";
  for (let i = 0; i < n; i++) {
    content += "Elo żelo\n";
  }

  fs.writeFile("elo-żelo.txt", content, (err: any) => {
    err && console.error(err);
  });
}

const currentMinutes = new Date().getMinutes();
eloZelo(currentMinutes);
