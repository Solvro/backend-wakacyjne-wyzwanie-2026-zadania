import * as fs from 'fs';
function eloZelo(minutes: number): void{

    let text: string = 'Elo zelo\n';

        let result: string = '';
        for (let i = 0; i < minutes; i++) {
        result += text;
        }

    fs.writeFile('elo-zelo.txt',result, (err: any) => {
        if (err) {
            console.error(err);
            console.log('Nie udało się zapisać pliku.');
        }
        else {
            console.log('Plik został pomyślnie zapisany.');
        }
    });
    console.log('Zapisano plik elo-zelo.txt z powtarzającym się tekstem ' + minutes + ' razy.');
}

const minuty: number = new Date().getMinutes();

eloZelo(minuty);