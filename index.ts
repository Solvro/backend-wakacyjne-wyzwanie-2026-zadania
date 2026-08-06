import fs from 'fs';

const filename = 'elo-zelo.txt'; // define filename
const minutes = new Date().getMinutes();
// const minutes = 0; // test when minutes is 0
const value = 'elo-zelo\n'; // define input value 

function eloZelo(filename: string, minutes: number, value: string): void {
   fs.writeFileSync(filename, '');
   for (let i = 0; i < minutes; i++) 
         fs.appendFileSync(filename, value);
}


eloZelo(filename, minutes, value);