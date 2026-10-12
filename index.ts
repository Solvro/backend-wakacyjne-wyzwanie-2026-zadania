import * as fs from 'fs';

function eloZelo(c: number):void{
    let result = "";

    for(let i=0; i<c; i++){
        result = result + "Elo żelo\n";
    }

    fs.writeFileSync('elo-żelo.txt', result, 'utf-8');
}

const currentMinutes = new Date().getMinutes();

eloZelo(currentMinutes);