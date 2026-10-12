import { writeFileSync } from 'node:fs';


function eloZelo(minutes : number) {
    const path = './eloZelo.txt';
    const content = 'eloZelo\n'.repeat(minutes);
    try {
        writeFileSync(path, content);
        console.log(`Sukces! Plik zapisany pomyślnie.`);
    } 
    catch (error) {
        if (error instanceof Error) {
            console.error(`Błąd podczas zapisywania pliku: ${error.message}`);
        }
    }
}   

const minutes = new Date().getMinutes();
eloZelo(minutes);