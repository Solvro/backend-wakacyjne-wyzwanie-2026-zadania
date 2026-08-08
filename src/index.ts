import fs from "node:fs";

function eloZelo(repeatCount: number){
    fs.writeFileSync("elo-zelo.txt", "Elo żelo\n".repeat(repeatCount));
}

eloZelo(new Date().getMinutes());