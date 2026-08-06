import * as fs from 'node:fs';

const input : Date = new Date();
const minuty : number = input.getMinutes() 

const EloZelo: string = "Elo żelo"

function eloZelo (indeks: number): void
{
    for (let i=0; i < indeks; i++)
        {
            //console.log("Elo żelo"); 
            fs.appendFileSync('elo-żelo.txt', EloZelo + '\n');          
        }
}

//console.log(result[1]);
//console.log(minuty);
eloZelo(minuty);