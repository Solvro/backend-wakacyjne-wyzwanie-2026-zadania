import * as fs from 'fs';

function eloZelo(n: number){
    const text = "Elo żelo\n".repeat(n);
    try{
        fs.writeFileSync('elo-żelo.txt', text);
    } catch(err:any){
        console.error(err)
    }
}

const min: number = new Date().getMinutes();
eloZelo(min);