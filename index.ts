import * as fs from 'fs';
function eloZelo(minutes: number){

    let text: string = 'Elo żelo';
    function repeatEloZelo(text: string){ 
        let result: string = '';
        for (let i = 0; i < minutes; i++) {
        result += text + '\n';
        }
        return result;
    }
    fs.writeFile('elo-żelo.txt',repeatEloZelo(text), (err: any) => {
        if (err) {
            console.error(err);
            console.log('Nie udało się zapisać pliku.');
        }
        else {
            console.log('Plik został pomyślnie zapisany.');
        }
    });
    console.log('Zapisano plik elo-żelo.txt z powtarzającym się tekstem ' + minutes + ' razy.');
}

eloZelo(new Date().getMinutes());