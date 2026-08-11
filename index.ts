const fs = require('fs');
const filePath: string = "elo-żelo.txt";
const now: Date = new Date();
const n=now.getMinutes();

function eloZelo(num: number){
    const out_string = "Elo żelo\n".repeat(num);
    try{
        fs.writeFileSync(filePath, out_string, 'utf-8');
        console.log("Wpisano Elo żelo", num, "razy\n");
    }catch(e){
        console.log(e);
    }
}

eloZelo(n);