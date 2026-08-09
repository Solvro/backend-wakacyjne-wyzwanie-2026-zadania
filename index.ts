const fs = require('fs');
const filePath: string = "elo-żelo.txt";
const now: Date = new Date();
const n=now.getMinutes();

function eloZelo(n: number){
    for(var i=1; i<=n; i++){
        fs.appendFileSync(filePath, "Elo żelo\n", 'utf-8');
    }
    console.log("Wpisano Elo żelo", n, "razy\n");
}

eloZelo(n);