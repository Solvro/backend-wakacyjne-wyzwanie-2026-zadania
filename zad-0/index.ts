import fs from 'fs';

const STRING_TEXT: string = "Elo żelo\n";
const FILE_NAME: string = "elo-żelo.txt";

function eloZelo(num: number): void {
    let fullText: string = "";
    for(let i=0; i<num; i++) {
        fullText += STRING_TEXT;
    }


    fs.writeFile(FILE_NAME, fullText, 'utf8', (err) => {
        if (err) {
            console.log("Error with writing to file: ", err);
            return;
        }
        return;
    });
};

const currMinute = new Date().getMinutes()

eloZelo(currMinute);