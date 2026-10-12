const { writeFile } = require('fs/promises');

function eloZelo(parameter : number){
    const path : string = '.elo-zelo.txt';
    const content : string = 'eloZelo\n'.repeat(parameter);

    try {
        writeFile(path, content);
    } catch (error : any) {
        console.error("Blad zapisu pliku", error.message);
    }
}

const parameter: number = new Date().getMinutes(); 
eloZelo(parameter);