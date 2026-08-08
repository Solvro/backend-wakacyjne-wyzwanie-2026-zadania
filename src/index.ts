const fs = require('node:fs');

const path : string = './elo-żelo.txt'
const content:string = 'elo żelo \n';

function eloZelo(num : number, cont: string) {
    fs.writeFile(path, '', err => {if (err) {console.error(err);} else {}});
    for(var i = 1; i <= num; i++) {
        fs.appendFile(path, cont, err => {if (err) {console.error(err);} else {}});
    };
};

const minutes : number = new Date().getMinutes();
eloZelo(minutes, content)