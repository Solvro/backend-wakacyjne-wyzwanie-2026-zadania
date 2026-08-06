import fs from 'fs';

const filename = 'elo-zelo.txt'; 
const iterations = new Date().getMinutes();
// const iterations = 0; // test when minutes equals 0
// const iterations = 60; // test when minutes exceeds allowed value
const value = 'elo-zelo'; 

function eloZelo(iterations: number): void { 
   try {
      if (iterations == 0) {
         fs.writeFileSync(filename, '');
         console.log('elo-zelo.txt rowna sie zero')
         } else if (iterations > 0 && iterations < 60) {
            const finalValue = (value + `\n`).repeat(iterations);
            fs.writeFileSync(filename, finalValue); 
            console.log(`${value} ląduje ${iterations} razy w ${filename}`);
         } else {
         console.log(`Limit ${value} (${iterations}) na godzinę przekroczony, zwolnij`);
      }
   } catch (error) {
      console.error(error);
      console.error(`${value} nie ląduje w ${filename} - go back and fix`);
   }
}

eloZelo(iterations); // call out the function