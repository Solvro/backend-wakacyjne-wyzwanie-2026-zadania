const fs = require('node:fs');
let text = "";

function eloZelo(n: number): void{
  for(let i=0; i<n; i++){
    text += "Elo żelo\n"
  }

  fs.writeFileSync('elo-żelo.txt',text)
}

eloZelo(new Date().getMinutes());
