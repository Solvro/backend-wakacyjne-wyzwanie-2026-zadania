import * as fs from 'fs';

const outputPath: string = './elo-żelo.txt';
let content: string = "";

function eloZelo (n: number) : void {
    for (let i = 0; i < n; i++) {
        content += "Elo żelo\n"
    }
    try {
        fs.writeFileSync(outputPath, content, 'utf8');
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

const minute: number = new Date().getMinutes();

eloZelo(minute);