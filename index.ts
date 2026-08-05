import * as fs from 'node:fs';

function eloZelo(n: number): void {
    let content = 'Elo żelo';
    
    for (let i = 0; i < n-1; i++) {
        content += '\nElo żelo';
    }

    fs.writeFile('elo-żelo.txt', content, (err: any) => {
        if(err) {
            console.error(err);
        }
    });
}

const minutes = new Date().getMinutes();
eloZelo(minutes);