import fs from 'fs';

const filename = 'elo-zelo.txt'; // define filename
const minutes = new Date().getMinutes();
// const minutes = 0; // test when minutes equals 0
const value = 'elo-zelo\n'; // define input value 

function eloZelo(filename: string, minutes: number, value: string): void { // use void to handle when minutes equals 0
   fs.writeFileSync(filename, ''); // write empty string to the file
   for (let i = 0; i < minutes; i++)  // iterate through current minutes value
         fs.appendFileSync(filename, value); // input value i times 
}

eloZelo(filename, minutes, value); // call out the function