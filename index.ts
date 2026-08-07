import fs from 'node:fs';

function eloZelo(n: number){
    if (n < 0){
        return
    }

    // czyszczenie
    fs.writeFileSync('elo-żelo.txt', '');

    for(let i = 0; i < n; i++){
        fs.appendFileSync('elo-żelo.txt', 'Elo żelo\n', err => {
            if (err) {
                console.error(err);
            }
        });
    }
}

const date = new Date();

eloZelo(date.getMinutes());

