import fs from "node:fs";

function eloZelo(eloZeloNumer: number) {

  
  if(fs.existsSync("elo-żelo.txt")) {
    fs.unlinkSync("elo-żelo.txt");
  }
  
  const content = "Elo żelo\n";
  for (let i = 0; i < eloZeloNumer; i++) {
      fs.appendFileSync("elo-żelo.txt", content, (err: any) => {
        if (err) console.error(err);
      });
  }
  console.log("Elo żelo napisane!");
}

eloZelo(new Date().getMinutes());