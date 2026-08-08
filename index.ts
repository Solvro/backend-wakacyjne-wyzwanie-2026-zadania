import { writeFileSync } from 'fs';


function eloZelo(parameter : number) {
    const path : string = './eloZelo.txt';
    const content : string = 'eloZelo\n'.repeat(parameter);
    try {
        writeFileSync(path, content);
        console.log(`Sukces! Plik zapisany pomyślnie.`);
    } catch (error : any) {
        console.error(`Błąd podczas zapisywania pliku:`, error.message);
    }
}

const parameter: number = new Date().getMinutes()
eloZelo(parameter);
