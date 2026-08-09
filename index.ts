import fs from 'node:fs';

const FILE_NAME = 'elo-żelo.txt';

const eloZelo = (amount: number) => {
    const content = ('Elo żelo\n').repeat(amount).slice(0, -1);
    fs.writeFile(FILE_NAME, content, err => {
        if (err) {
            console.error('Error occurred ',err);
        } else {
            console.log('File written successfully!')
        }
    })
}

const minutes = new Date().getMinutes();
eloZelo(minutes)