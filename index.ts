import fs from 'node:fs';

function eloZelo(n: number){
    if (n < 0){
        return
    }

    try {
    const elo = 'Elo żelo\n'.repeat(n);

    fs.writeFileSync('elo-żelo.txt', elo);
    }
    catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

const date = new Date();

eloZelo(date.getMinutes());

