import * as fs from 'fs';

const outputFilePath: string = 'elo-żelo.txt';

function eloZelo(number: number): void {
    let message = "";
    for (let i = 0; i < number; i++) {
        message+="Elo żelo\n";
    }

    fs.writeFileSync(outputFilePath, message, 'utf-8');
}
let currentDate = new Date().getMinutes();
eloZelo(currentDate)