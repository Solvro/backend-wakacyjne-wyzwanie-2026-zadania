import fs from 'node:fs';

function eloZelo(count: number){
    let text: string = "";

    for(let i: number = 0; i<count; i++){
        text += "Elo żelo\n"
    }
    
    fs.writeFile('./elo-żelo.txt', text, err => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Success");
        }
    });
};

let minutes: number = (new Date).getMinutes();
eloZelo(minutes);