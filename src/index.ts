import * as fs from 'fs';

function eloZelo(num: number) {
    let text = "";

    for (let i = 0; i < num; i++) {
        text = text + "Elo żelo\n";
    }

    fs.writeFileSync("elo-żelo.txt", text);
    console.log("Tekst zostal zapisany do pliku elo-żelo.txt " + num + " razy.");
}

let aktualnyCzas = new Date();
let minuty = aktualnyCzas.getMinutes();

console.log("Aktualna minuta to: " + minuty);
eloZelo(minuty);



