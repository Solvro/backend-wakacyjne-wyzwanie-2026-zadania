

declare const require: any;
const fs = require('fs');


function eloZelo(a: number){
fs.writeFileSync('elo-żelo.txt', '');

const Time = new Date();
let minutes = Time.getMinutes();
a = minutes

for(a; a > 0; a--){
    fs.appendFileSync('elo-żelo.txt', 'Elo żelo');
}
}
eloZelo(0); 