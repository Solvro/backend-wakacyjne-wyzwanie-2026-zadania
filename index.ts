import * as fs from 'fs';

function eloZelo(ileRazy: number) {
    let tekst = "";

    for (let i = 0; i < ileRazy; i++) {
        tekst += "Elo żelo\n";
    }

    fs.writeFileSync('elo-żelo.txt', tekst);

}

const aktualnaData = new Date();
const aktualnaMinuta = aktualnaData.getMinutes();

eloZelo(aktualnaMinuta);