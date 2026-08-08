import * as fs from 'fs';

const outputPath: string = './elo-żelo.txt';
const content: string = "Elo żelo\n";

function eloZelo (n: number) : void {
    fs.writeFileSync(outputPath, "");
    for (let i = 0; i < n; i++) {
        fs.appendFileSync(outputPath, content, 'utf8');
    }
}


const minute: number = new Date().getMinutes();

eloZelo(minute);