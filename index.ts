import fs from "node:fs";

const content = "Elo żelo\n";
function eloZelo(eloZeloNumer: number) {
  for (let i = 0; i < eloZeloNumer; i++) {
      fs.appendFile("elo-żelo.txt", content, (err: any) => {
        if (err) console.error(err);
      });
  }
  console.log("Elo żelo napisane!");
}

eloZelo(new Date().getMinutes());